drop database if exists bank_db;
create database bank_db;
use bank_db;

-- CUSTOMER
CREATE TABLE Customer (
    customerCode CHAR(36) PRIMARY KEY DEFAULT (UUID()), 
    firstName VARCHAR(50) NOT NULL CHECK (TRIM(firstName) <> ''), 
    lastName VARCHAR(50) NOT NULL CHECK (TRIM(lastName) <> ''), 
    homeAddress VARCHAR(255) NOT NULL CHECK (TRIM(homeAddress) <> ''),
    officeAddress VARCHAR(255), 
    phoneNumber VARCHAR(15) NOT NULL,
    email VARCHAR(100), 
    dob DATE NOT NULL,
    guardianConfirmation BOOLEAN
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

-- ACCOUNT
CREATE TABLE Account (
    accountNumber CHAR(36) PRIMARY KEY DEFAULT (UUID()),  
    customerCode CHAR(36), 
    accountType ENUM('Savings', 'Checking', 'Loan') NOT NULL, 
    openDate DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (customerCode) REFERENCES Customer(customerCode),
    CONSTRAINT check_type CHECK (accountType IN ('Savings', 'Checking', 'Loan'))
);

DELIMITER //
CREATE TRIGGER CHK_account_open_date
BEFORE UPDATE ON Account
FOR EACH ROW
BEGIN
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
    dateOfTaken DATE NOT NULL DEFAULT CURRENT_DATE,
    dueBalance DECIMAL(15, 2) NOT NULL CHECK (dueBalance >= 0), 
    interestRate DECIMAL(5, 2) NOT NULL,
    FOREIGN KEY (accountNumber) REFERENCES Account(accountNumber)
);

DELIMITER //
CREATE TRIGGER CHK_account_loan_taken_date
BEFORE UPDATE ON LoanAccount
FOR EACH ROW
BEGIN
    IF NEW.dateOfTaken > CURRENT_DATE() THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Ngày nhận khoản vay không thể lớn hơn ngày hiện tại.';
    END IF;
END;
//
DELIMITER ;


