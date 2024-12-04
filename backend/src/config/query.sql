-- 2a. UPDATE
SET SQL_SAFE_UPDATES = 0;

UPDATE SavingsAccount as s
JOIN Account as a ON s.accountNumber = a.accountNumber 
SET interestRate = 10
WHERE a.openDate >= '2020-09-01';

SET SQL_SAFE_UPDATES = 0;


-- 2c. FUNCTION
DELIMITER $$

CREATE FUNCTION get_balance_per_accounts(customerCode CHAR(36))
RETURNS JSON
DETERMINISTIC
BEGIN
    DECLARE result JSON;

    SELECT JSON_OBJECT(
        'Saving', COALESCE(SUM(CASE WHEN sa.accountNumber IS NOT NULL THEN sa.accountBalance ELSE 0 END), 0),
        'Checking', COALESCE(SUM(CASE WHEN ca.accountNumber IS NOT NULL THEN ca.accountBalance ELSE 0 END), 0),
        'Loan', COALESCE(SUM(CASE WHEN la.accountNumber IS NOT NULL THEN la.dueBalance ELSE 0 END), 0)
    )
    INTO result
    FROM Account a
    LEFT JOIN SavingsAccount sa ON a.accountNumber = sa.accountNumber
    LEFT JOIN CheckingAccount ca ON a.accountNumber = ca.accountNumber
    LEFT JOIN LoanAccount la ON a.accountNumber = la.accountNumber
    WHERE a.customerCode = customerCode;

    RETURN result;
END $$

DELIMITER ;

SELECT get_balance_per_accounts('CS001');

-- 2d. PROCEDURE
DELIMITER $$

CREATE PROCEDURE SortEmployeesByCustomers (IN StartDate DATE, IN EndDate DATE)
BEGIN
    SELECT 
        CONCAT(Employee.firstName, ' ', Employee.lastName) AS eName,
        ServedDate.eID AS eID,
        COUNT(DISTINCT ServedDate.cID) AS totalServe
    FROM 
        ServedDate
    JOIN 
        Employee ON ServedDate.eID = Employee.employeeID
    WHERE 
        dateOfServing BETWEEN StartDate AND EndDate
    GROUP BY 
        ServedDate.eID, Employee.firstName, Employee.lastName
    ORDER BY 
        totalServe DESC;
END$$

DELIMITER ;

CALL SortEmployeesByCustomers('2024-10-01', '2024-10-11');

-- 3.4
SELECT 
            e.employeeID,
            CONCAT(e.firstName, ' ', e.lastName) AS employeeName,
            e.branchName,
            CASE 
                WHEN b.employeeID IS NOT NULL THEN 'Manager'
                ELSE 'Staff'
            END AS position,
            c.customerCode,
            CONCAT(c.firstName, ' ', c.lastName) AS customerName,
            c.email,
            s.dateOfServing
        FROM 
            ServedDate s
        JOIN 
            Employee e ON s.eID = e.employeeID
        JOIN 
            Customer c ON s.cID = c.customerCode
        LEFT JOIN 
            Branch b ON e.employeeID = b.employeeID 
        ORDER BY 
            s.dateOfServing DESC;
