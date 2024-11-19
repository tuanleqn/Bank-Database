-- 2d. PROCEDURE
DELIMITER $$

CREATE PROCEDURE SortEmployeesByCustomers (IN StartDate DATE, IN EndDate DATE)
BEGIN
    SELECT 
        eID,
        COUNT(DISTINCT cID) AS NumCustomers
    FROM 
        ServedDate
    WHERE 
        dateOfServing BETWEEN StartDate AND EndDate
    GROUP BY 
        eID
    ORDER BY 
        NumCustomers DESC;
END$$

DELIMITER ;

CALL SortEmployeesByCustomers('2024-01-01', '2024-11-01');

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
