-- Employee
INSERT INTO
    Employee (
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
VALUES
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

INSERT INTO
    EmployeePhone (employeeID, phoneNumber)
VALUES
    ('E003', '5557889147'),
    ('E004', '5553336442'),
    ('E005', '5559230417'),
    ('E006', '5555776107');

-- Customer
INSERT INTO
    Customer (
        customerCode,
        firstName,
        lastName,
        homeAddress,
        officeAddress,
        email,
        dob,
        guardianConfirmation,
        eID
    )
VALUES
    (
        'CS001',
        'Alice',
        'Nguyen',
        '123 Nguyen Trai',
        '456 Le Loi',
        'admin1@hcmut.edu.vn',
        '1990-01-15',
        FALSE,
        'E001'
    ),
    (
        'CS002',
        'Bob',
        'Pham',
        '789 Tran Hung Dao',
        NULL,
        'user1@hcmut.edu.vn',
        '1985-05-22',
        FALSE,
        'E001'
    ),
    (
        'CS003',
        'Charlie',
        'Tran',
        '321 Binh Tan',
        '654 Pham Van Dong',
        'charlie.tran@example.com',
        '1995-07-10',
        FALSE,
        'E002'
    ),
    (
        'CS004',
        'David',
        'Le',
        '102 Hoang Hoa Tham',
        NULL,
        'david.le@example.com',
        '2007-03-14',
        TRUE,
        'E003'
    ),
    (
        'CS005',
        'Eve',
        'Hoang',
        '456 Hai Ba Trung',
        '789 Tan Binh',
        'eve.hoang@example.com',
        '1998-08-21',
        FALSE,
        'E001'
    ),
    (
        'CS006',
        'Sophia',
        'Tran',
        '15 Nguyen Van Linh',
        '88 Nguyen Hue',
        'sophia.tran@example.com',
        '1980-12-01',
        FALSE,
        'E001'
    ),
    (
        'CS007',
        'Michael',
        'Nguyen',
        '90 Tran Nao',
        NULL,
        'michael.nguyen@example.com',
        '1983-04-22',
        FALSE,
        'E002'
    ),
    (
        'CS008',
        'Emma',
        'Le',
        '120 Phan Xich Long',
        '150 Cong Hoa',
        'emma.le@example.com',
        '1992-06-11',
        FALSE,
        'E003'
    ),
    (
        'CS009',
        'Liam',
        'Vo',
        '60 Bach Dang',
        NULL,
        'liam.vo@example.com',
        '1988-09-14',
        FALSE,
        'E004'
    ),
    (
        'CS010',
        'Olivia',
        'Phan',
        '30 Vo Van Kiet',
        '200 Hai Ba Trung',
        'olivia.phan@example.com',
        '1990-11-03',
        FALSE,
        'E005'
    ),
    (
        'CS011',
        'Noah',
        'Hoang',
        '70 Le Thanh Ton',
        NULL,
        'noah.hoang@example.com',
        '1996-08-05',
        FALSE,
        'E006'
    ),
    (
        'CS012',
        'William',
        'Dang',
        '45 Nguyen Dinh Chieu',
        '110 Nguyen Thi Minh Khai',
        'william.dang@example.com',
        '1987-01-20',
        FALSE,
        'E001'
    ),
    (
        'CS013',
        'Isabella',
        'Ngo',
        '80 Tran Phu',
        NULL,
        'isabella.ngo@example.com',
        '1993-05-15',
        FALSE,
        'E002'
    ),
    (
        'CS014',
        'James',
        'Pham',
        '33 Le Loi',
        '77 Cach Mang Thang 8',
        'james.pham@example.com',
        '1999-03-30',
        FALSE,
        'E003'
    ),
    (
        'CS015',
        'Charlotte',
        'Duong',
        '55 Le Duan',
        '90 Hoang Sa',
        'charlotte.duong@example.com',
        '1992-07-28',
        FALSE,
        'E004'
    )
INSERT INTO
    ServedDate (eID, cID, dateOfServing)
VALUES
    ('E001', 'CS001', '2024-10-01'),
    ('E001', 'CS001', '2024-10-08'),
    ('E001', 'CS001', '2024-10-15'),
    ('E001', 'CS001', '2024-10-22'),
    ('E002', 'CS002', '2024-10-02'),
    ('E002', 'CS002', '2024-10-09'),
    ('E002', 'CS002', '2024-10-16'),
    ('E003', 'CS003', '2024-10-03'),
    ('E003', 'CS003', '2024-10-10'),
    ('E003', 'CS003', '2024-10-17'),
    ('E003', 'CS003', '2024-10-24'),
    ('E004', 'CS004', '2024-10-04'),
    ('E004', 'CS004', '2024-10-11'),
    ('E004', 'CS004', '2024-10-18'),
    ('E005', 'CS005', '2024-10-05'),
    ('E005', 'CS005', '2024-10-12'),
    ('E005', 'CS005', '2024-10-19'),
    ('E005', 'CS005', '2024-10-26'),
    ('E006', 'CS006', '2024-10-06'),
    ('E006', 'CS006', '2024-10-13'),
    ('E006', 'CS006', '2024-10-20'),
    ('E001', 'CS007', '2024-10-01'),
    ('E001', 'CS007', '2024-10-08'),
    ('E002', 'CS008', '2024-10-02'),
    ('E002', 'CS008', '2024-10-09'),
    ('E003', 'CS009', '2024-10-03'),
    ('E003', 'CS009', '2024-10-10'),
    ('E004', 'CS010', '2024-10-04'),
    ('E004', 'CS010', '2024-10-11'),
    ('E005', 'CS011', '2024-10-11'),
    ('E006', 'CS012', '2024-10-12'),
    ('E001', 'CS013', '2024-10-13'),
    ('E002', 'CS014', '2024-10-14'),
    ('E003', 'CS015', '2024-10-15'),
    ('E004', 'CS016', '2024-10-16'),
    ('E005', 'CS017', '2024-10-17'),
    ('E006', 'CS018', '2024-10-18'),
    ('E001', 'CS019', '2024-10-19'),
    ('E002', 'CS020', '2024-10-20'),
    ('E003', 'CS021', '2024-10-21'),
    ('E004', 'CS022', '2024-10-22'),
    ('E005', 'CS023', '2024-10-23'),
    ('E006', 'CS024', '2024-10-24'),
    ('E001', 'CS025', '2024-10-25'),
    ('E002', 'CS026', '2024-10-26'),
    ('E003', 'CS027', '2024-10-27'),
    ('E004', 'CS028', '2024-10-28'),
    ('E005', 'CS029', '2024-10-29'),
    ('E006', 'CS030', '2024-10-30'),
    ('E001', 'CS031', '2024-10-31'),
    ('E002', 'CS032', '2024-10-31'),
    ('E003', 'CS033', '2024-10-31'),
    ('E004', 'CS034', '2024-10-31'),
    ('E005', 'CS035', '2024-10-31');

-- Account
INSERT INTO
    Account (
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
    ),
     (
		'AC005',
        'CS006',
        'Checking',
		'2022-05-22'
    ),
     (
		'AC006',
        'CS006',
        'Savings',
		'2022-05-22'
    ),
    (
		'AC007',
        'CS003',
        'Checking',
		'2016-07-19'
    ),
    (
		'AC008',
        'CS003',
        'Loan',
		'2016-07-19'
    ),
    (
		'AC009',
        'CS003',
        'Savings',
		'2016-07-19'
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
    ),
    (
		'AC005',
        10153000
    ),
    (
		'AC007',
        12343000
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
    ),
    (
		'AC006',
        0.07,
        10115000
    ),
    (
		'AC009',
        1,
        9085000
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
    ),
    (
		'AC008',
        '2021-01-31',
        20000000,
        0.18
    );

-- Thêm số điện thoại cho khách hàng vào bảng CustomerPhoneNumber
INSERT INTO
    CustomerPhoneNumber (phoneNumber, customerCode)
VALUES
    (
        '0901123456',
        (
            SELECT
                customerCode
            FROM
                Customer
            WHERE
                customerCode = 'CS001'
        )
    ),
    (
        '0902123456',
        (
            SELECT
                customerCode
            FROM
                Customer
            WHERE
                customerCode = 'CS002'
        )
    ),
    (
        '0903123456',
        (
            SELECT
                customerCode
            FROM
                Customer
            WHERE
                customerCode = 'CS003'
        )
    ),
    (
        '0904123456',
        (
            SELECT
                customerCode
            FROM
                Customer
            WHERE
                customerCode = 'CS004'
        )
    ),
    (
        '0905123456',
        (
            SELECT
                customerCode
            FROM
                Customer
            WHERE
                customerCode = 'CS005'
        )
    ),
    (
        '0905123123',
        (
            SELECT
                customerCode
            FROM
                Customer
            WHERE
                customerCode = 'CS006'
        )
    );

-- TK: là email, MK: 123456
INSERT INTO
    user (email, password, role)
VALUES
    (
        'admin1@hcmut.edu.vn',
        '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y',
        'admin'
    ),
    (
        'user1@hcmut.edu.vn',
        '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y',
        'user'
    );