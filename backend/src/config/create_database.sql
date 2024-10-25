-- Tạm thời tắt kiểm tra khoá ngoại
SET FOREIGN_KEY_CHECKS = 0;
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
    employeeID CHAR(12) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    birthDate DATE NOT NULL,
    employeeNo INT UNSIGNED NOT NULL,
    street VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    branchName VARCHAR(255) NOT NULL,
    FOREIGN KEY (branchName) REFERENCES Branch(branchName),
    -- Kiểm tra tuổi nhân viên phải lớn hơn hoặc bằng 18
    CHECK (DATEDIFF(CURDATE(), birthDate) / 365.25 >= 18)
);
ALTER TABLE Branch
ADD CONSTRAINT FK_Branch_Employee FOREIGN KEY (employeeID) REFERENCES Employee(employeeID);
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
    employeeID CHAR(12) NOT NULL,
    phoneNumber CHAR(10) NOT NULL,
    PRIMARY KEY (employeeID, phoneNumber),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID)
);
-- Bật lại kiểm tra khoá ngoại
SET FOREIGN_KEY_CHECKS = 1;
-- Khởi tạo một vài giá trị ban đầu để tránh lỗi tham chiếu khoá ngoại
SET FOREIGN_KEY_CHECKS = 0;
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
        12345,
        '123 Elm St',
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
        12346,
        '456 Oak St',
        'District 2',
        'City B',
        'janesmith@example.com',
        'Branch B'
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
        1,
        '123 Main St',
        'District 1',
        'City A',
        'Region 1',
        'branchA@example.com',
        'E001'
    ),
    (
        'Branch B',
        2,
        '456 Market St',
        'District 2',
        'City B',
        'Region 2',
        'branchB@example.com',
        'E002'
    );
INSERT INTO BranchPhone (branchName, phoneNumber)
VALUES ('Branch A', '1234567890'),
    ('Branch B', '0987654321');
INSERT INTO BranchFax (branchName, faxNumber)
VALUES ('Branch A', '1112223333'),
    ('Branch B', '4445556666');
INSERT INTO EmployeePhone (employeeID, phoneNumber)
VALUES ('E001', '1234567890'),
    ('E002', '0987654321');
SET FOREIGN_KEY_CHECKS = 1;