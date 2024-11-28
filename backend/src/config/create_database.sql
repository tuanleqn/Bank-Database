DROP DATABASE IF EXISTS bank_db;
CREATE DATABASE bank_db;
USE bank_db;

CREATE TABLE Branch (
    branchName VARCHAR(255) PRIMARY KEY,
    branchNo INT UNSIGNED NOT NULL,
    street VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    employeeID CHAR(12) NOT NULL -- FOREIGN KEY (employeeID) REFERENCES Employee(employeeID)  -- Khoá ngoại sẽ thêm sau
);

CREATE TABLE Employee (
    employeeID CHAR(36) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    birthDate DATE NOT NULL,
    employeeNo INT UNSIGNED NOT NULL,
    street VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    branchName VARCHAR(255) NOT NULL,
    FOREIGN KEY (branchName) REFERENCES Branch(branchName)
);

DELIMITER //
CREATE TRIGGER check_employee_age
BEFORE INSERT ON Employee
FOR EACH ROW
BEGIN
    IF DATEDIFF(CURDATE(), NEW.birthDate) / 365.25 < 18 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Nhân viên phải từ 18 tuổi trở lên.';
    END IF;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER check_employee_age_update
BEFORE UPDATE ON Employee
FOR EACH ROW
BEGIN
    IF DATEDIFF(CURDATE(), NEW.birthDate) / 365.25 < 18 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Nhân viên phải từ 18 tuổi trở lên.';
    END IF;
END;
//
DELIMITER ;

CREATE TABLE BranchPhone(
    branchName VARCHAR(255) NOT NULL,
    phoneNumber CHAR(10) NOT NULL,
    PRIMARY KEY (branchName, phoneNumber),
    FOREIGN KEY (branchName) REFERENCES Branch(branchName)
);

CREATE TABLE BranchFax(
    branchName VARCHAR(255) NOT NULL,
    faxNumber CHAR(10) NOT NULL,
    PRIMARY KEY (branchName, faxNumber),
    FOREIGN KEY (branchName) REFERENCES Branch(branchName)
);

CREATE TABLE EmployeePhone(
    employeeID CHAR(36) NOT NULL,
    phoneNumber CHAR(10) NOT NULL,
    PRIMARY KEY (employeeID, phoneNumber),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID)
);

-- CUSTOMER
CREATE TABLE Customer (
    customerCode CHAR(36) PRIMARY KEY DEFAULT (UUID()), 
    firstName VARCHAR(50) NOT NULL CHECK (TRIM(firstName) <> ''), 
    lastName VARCHAR(50) NOT NULL CHECK (TRIM(lastName) <> ''), 
    homeAddress VARCHAR(255) NOT NULL CHECK (TRIM(homeAddress) <> ''),
    officeAddress VARCHAR(255), 
    email VARCHAR(100) NOT NULL UNIQUE CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'), 
    dob DATE NOT NULL,
    guardianConfirmation BOOLEAN,
    eID CHAR(36) NOT NULL,
    FOREIGN KEY (eID) REFERENCES Employee(employeeID) 
);

DELIMITER //
CREATE TRIGGER CHK_dob
BEFORE INSERT ON Customer
FOR EACH ROW
BEGIN
    IF NEW.dob > CURRENT_DATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Ngày sinh không thể lớn hơn ngày hiện tại.';
    END IF;

    IF YEAR(CURRENT_DATE()) - YEAR(NEW.dob) < 16 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Khách hàng phải từ đủ 16 tuổi trở lên.';
    END IF;
END;
//
DELIMITER ;

CREATE TABLE CustomerPhoneNumber (
    phoneNumber VARCHAR(15) NOT NULL CHECK (LENGTH(phoneNumber) > 0 AND LENGTH(phoneNumber) <= 11 AND (phoneNumber REGEXP '^[0-9]+$')),
    customerCode CHAR(36),
    PRIMARY KEY (phoneNumber, customerCode),
    FOREIGN KEY (customerCode) REFERENCES Customer(customerCode) ON DELETE CASCADE
);

CREATE TABLE ServedDate (
    sID CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    eID CHAR(36) NOT NULL,
    cID CHAR(36) NOT NULL,
    dateOfServing DATE,
    FOREIGN KEY (eID) REFERENCES Employee(employeeID),
    FOREIGN KEY (cID) REFERENCES Customer(customerCode)
);

DELIMITER //
CREATE TRIGGER CHK_served_date
BEFORE INSERT ON ServedDate
FOR EACH ROW
BEGIN
    IF NEW.dateOfServing IS NULL THEN
        SET NEW.dateOfServing = CURRENT_DATE;
    END IF;

    IF NEW.dateOfServing > CURRENT_DATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Ngày phục vụ không thể lớn hơn ngày hiện tại.';
    END IF;
END;
//
DELIMITER ;

-- ACCOUNT
CREATE TABLE Account (
    accountNumber CHAR(36) PRIMARY KEY DEFAULT (UUID()),  
    customerCode CHAR(36), 
    accountType ENUM('Savings', 'Checking', 'Loan') NOT NULL, 
    openDate DATE NOT NULL,
    FOREIGN KEY (customerCode) REFERENCES Customer(customerCode),
    CONSTRAINT check_type CHECK (accountType IN ('Savings', 'Checking', 'Loan'))
);

DELIMITER //
CREATE TRIGGER CHK_account_open_date
BEFORE INSERT ON Account
FOR EACH ROW
BEGIN
    IF NEW.openDate IS NULL THEN
        SET NEW.openDate = CURRENT_DATE;
    END IF;

    IF NEW.openDate > CURRENT_DATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Ngày tạo tài khoản không thể lớn hơn ngày hiện tại.';
    END IF;
END;
//
DELIMITER ;

-- CONSTRAINT UNIQUE ACCOUNT TYPE 
ALTER TABLE Account
ADD CONSTRAINT CHK_unique
UNIQUE (customerCode, accountType); 

-- SAVINGS ACCOUNT
CREATE TABLE SavingsAccount (
    accountNumber CHAR(36) PRIMARY KEY,
    interestRate DECIMAL(5, 2) NOT NULL,
    accountBalance DECIMAL(15, 2) NOT NULL CHECK (accountBalance >= 0), 
    FOREIGN KEY (accountNumber) REFERENCES Account(accountNumber) 
);

-- CHECKING ACCOUNT
CREATE TABLE CheckingAccount (
    accountNumber CHAR(36) PRIMARY KEY,
    accountBalance DECIMAL(15, 2) NOT NULL CHECK (accountBalance >= 0), 
    FOREIGN KEY (accountNumber) REFERENCES Account(accountNumber)
);

-- LOAN ACCOUNT
CREATE TABLE LoanAccount (
    accountNumber CHAR(36) PRIMARY KEY,
    dateOfTaken DATE NOT NULL,
    dueBalance DECIMAL(15, 2) NOT NULL, 
    interestRate DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (accountNumber) REFERENCES Account(accountNumber)
);

DELIMITER //
CREATE TRIGGER CHK_account_loan_taken_date
BEFORE INSERT ON LoanAccount
FOR EACH ROW
BEGIN
	IF NEW.dateOfTaken IS NULL THEN
        SET NEW.dateOfTaken = CURRENT_DATE();
    END IF;

    IF NEW.dateOfTaken > CURRENT_DATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Ngày nhận khoản vay không thể lớn hơn ngày hiện tại.';
    END IF;
END;
//
DELIMITER ;

CREATE TABLE `user` (
	id 			int not null auto_increment,
    email 		varchar(50) not null UNIQUE CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
    password 	varchar(128) not null,
    role		varchar(50) not null default 'user',
    primary 	key (id)
);


INSERT INTO Branch (
        branchName,
        branchNo,
        street,
        district,
        city,
        region,
        email,
        employeeID
    )
VALUES (
        'Branch A',
        15,
        'Main St',
        'District 1',
        'City A',
        'Region 1',
        'branchA@example.com',
        'E001'
    ),
    (
        'Branch B',
        95,
        'Market St',
        'District 2',
        'City B',
        'Region 2',
        'branchB@example.com',
        'E002'
    ),
    (
        'Branch C',
        43,
        'Northway St',
        'District 1',
        'City C',
        'Region 1',
        'branchA@example.com',
        'E003'
    ),
    (
        'Branch D',
        76,
        'Sidelane St',
        'District 2',
        'City D',
        'Region 2',
        'branchB@example.com',
        'E004'
    );


INSERT INTO Employee (
        employeeID,
        firstName,
        lastName,
        birthDate,
        employeeNo,
        street,
        district,
        city,
        email,
        branchName
    )
VALUES (
        'E001',
        'John',
        'Doe',
        '1985-06-15',
        123,
        'Elm St',
        'District 1',
        'City A',
        'johndoe@example.com',
        'Branch A'
    ),
    (
        'E002',
        'Jane',
        'Smith',
        '1990-09-10',
        456,
        'Oak St',
        'District 2',
        'City B',
        'janesmith@example.com',
        'Branch B'
    ),
    (
        'E003',
        'John',
        'Borg',
        '1985-07-12',
        145,
        'Helm St',
        'District 1',
        'City A',
        'johnborg@example.com',
        'Branch C'
    ),
    (
        'E004',
        'Jane',
        'Watt',
        '1991-01-13',
        26,
        'Aloha St',
        'District 2',
        'City B',
        'janewatt@example.com',
        'Branch D'
    );

ALTER TABLE Branch
ADD CONSTRAINT FK_Branch_Employee FOREIGN KEY (employeeID) REFERENCES Employee(employeeID);