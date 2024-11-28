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
