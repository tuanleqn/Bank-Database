-- Employee
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
    ),
    (
        'E005',
        'Harry',
        'Newhelm',
        '1997-03-23',
        18,
        'Willhelm St',
        'District 2',
        'City B',
        'harrywillhelm@example.com',
        'Branch B'
    ),
    (
        'E006',
        'James',
        'Born',
        '1992-05-21',
        47,
        'Pork St',
        'District 1',
        'City A',
        'jamesborn@example.com',
        'Branch A'
    );
    
INSERT INTO EmployeePhone (employeeID, phoneNumber)
VALUES ('E003', '5557889147'),
    ('E004', '5553336442'),
    ('E005', '5559230417'),
    ('E006', '5555776107');
    
-- Customer
INSERT INTO Customer 
	(
    customerCode,
    firstName,
    lastName,
    homeAddress,
    officeAddress,
    phoneNumber,
    email,
    dob,
    guardianConfirmation
	) 
VALUES
    ('CS001',
    'Alice',
    'Nguyen',
    '123 Nguyen Trai',
    '456 Le Loi',
    '0901123456',
    'admin1@hcmut.edu.vn',
    '1990-01-15',
    FALSE
    ),
    ('CS002',
    'Bob',
    'Pham',
    '789 Tran Hung Dao',
    NULL,
    '0902123456',
    'user1@hcmut.edu.vn',
    '1985-05-22',
    FALSE
    ),
    ('CS003',
    'Charlie',
    'Tran',
    '321 Binh Tan',
    '654 Pham Van Dong',
    '0903123456',
    'charlie.tran@example.com',
    '1995-07-10',
    FALSE
    ),
    ('CS004',
    'David',
    'Le',
    '102 Hoang Hoa Tham',
    NULL,
    '0904123456',
    'david.le@example.com',
    '2007-03-14',
    TRUE
    ),
    ('CS005',
    'Eve',
    'Hoang',
    '456 Hai Ba Trung',
    '789 Tan Binh',
    '0905123456',
    'eve.hoang@example.com',
    '1998-08-21',
    FALSE
    );
-- Account
INSERT INTO Account (
	accountNumber,  
    customerCode, 
    accountType, 
    openDate
    )
VALUES
	(
		'AC001',
        'CS003',
        'Checking',
		'2016-07-18'
    ),
    (
		'AC002',
        'CS004',
        'Savings',
		'2020-03-02'
    ),
    (
		'AC003',
        'CS001',
        'Loan',
		'2021-01-31'
    ),
    (
		'AC004',
        'CS005',
        'Checking',
		'2022-05-22'
    );
INSERT INTO CheckingAccount
	(
    accountNumber,
    accountBalance
    )
VALUE
	(
		'AC001',
        23765000
    ),
    (
		'AC004',
        10115000
    );
INSERT INTO SavingsAccount
	(
    accountNumber,
    interestRate,
    accountBalance
    )
VALUE
	(
		'AC002',
        0.06,
        236765000	
    );
    
INSERT INTO LoanAccount
	(
    accountNumber,
    dateOfTaken,
    dueBalance,
    interestRate
    )
VALUE
	(
		'AC003',
        '2021-01-31',
        10000000,
        0.18
    );

-- Thêm số điện thoại cho khách hàng vào bảng CustomerPhoneNumber
INSERT INTO CustomerPhoneNumber (phoneNumber, customerCode)
VALUES
    ('0901123456', (SELECT customerCode FROM Customer WHERE firstName = 'Alice')),
    ('0902123456', (SELECT customerCode FROM Customer WHERE firstName = 'Bob')),
    ('0903123456', (SELECT customerCode FROM Customer WHERE firstName = 'Charlie')),
    ('0904123456', (SELECT customerCode FROM Customer WHERE firstName = 'David')),
    ('0905123456', (SELECT customerCode FROM Customer WHERE firstName = 'Eve'));



-- TK: là email, MK: 123456
INSERT INTO user (email, password, role) VALUES
('admin1@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'admin'), 
('user1@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'user');

