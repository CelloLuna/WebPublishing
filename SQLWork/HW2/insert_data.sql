/* This was run in php myadmin because the query data was so long */
INSERT INTO 
employees(id, name, age, yearsWithCompany)
VALUES
(1, 'John Doe', 55, 1), 
(2, 'Jane Doe', 34, 6), 
(3, 'Spongebob Squarepants', 32, 3), 
(4, 'Peter Griffen', 50, 10), 
(5, 'Evan Sambrugaro', 41, 23), 
(6, 'Marcello Luna', 27, 2), 
(7, 'Mary Jane', 43, 5), 
(8, 'Johnathan Dough', 25, 13), 
(9, 'Janice Joplin', 30, 2), 
(10, 'Louis Prima', 33, 5); 

INSERT INTO
salary_grade(employeeId, salary)
VALUES
(1, 75000),
(2, 100000),
(3, 35000),
(4, 66000),
(5, 89000),
(6, 125000),
(7, 50000),
(8, 62000),
(9, 120000),
(10, 76000);

INSERT INTO
department(employeeId, department)
VALUES
(1, "IT"),
(2, "HR"),
(3, "IT"),
(4, "HR"),
(5, "Stock Room"),
(6, "Stock Room"),
(7, "Accounting"),
(8, "IT"),
(9, "Accounting"),
(10, "Accounting");