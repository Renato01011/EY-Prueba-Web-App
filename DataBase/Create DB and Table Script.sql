EXEC sp_configure 'remote access', 0;
GO
RECONFIGURE;
GO
CREATE DATABASE DBSuppliers;
GO
USE DBSuppliers;

CREATE TABLE Suppliers (
	Id INT PRIMARY KEY IDENTITY,
	CompanyName VARCHAR(50) NOT NULL,
	Name VARCHAR(50) NOT NULL,
	TaxIdentification NUMERIC(11) NOT NULL,
	PhoneNumber NVARCHAR(9) NOT NULL,
	Email NVARCHAR(255) NOT NULL,
	WebSite NVARCHAR(50) NOT NULL,
	Address NVARCHAR(50) NOT NULL,
	Country NVARCHAR(50) NOT NULL,
	AnnualBilling NUMERIC(15) NOT NULL,
	LastModified DateTime NOT NULL,
);

INSERT INTO Suppliers (CompanyName, Name, TaxIdentification, PhoneNumber, Email, WebSite, Address, Country, AnnualBilling, LastModified)
VALUES 
('Tech Innovators', 'John Doe', 123456789, '923456789', 'johndoe@techinnovators.com', 'www.techinnovators.com', '123 Innovation St', 'USA', 500000, '2024-12-06'),
('Global Supplies', 'Jane Smith', 987654321, '987654321', 'janesmith@globalsupplies.com', 'www.globalsupplies.com', '456 Global Ave', 'Canada', 800000, '2024-12-06'),
('GreenTech Solutions', 'Alice Brown', 345678901, '955123456', 'alicebrown@greentechsolutions.com', 'www.greentechsolutions.com', '789 Eco Park', 'UK', 750000, '2024-12-06');

GO

CREATE PROCEDURE SP_ADD_SUPPLIER (
	@CompanyName VARCHAR(50),
	@Name VARCHAR(50),
	@TaxIdentification NUMERIC(11),
	@PhoneNumber NVARCHAR(9),
	@Email NVARCHAR(255),
	@WebSite NVARCHAR(50),
	@Address NVARCHAR(50),
	@Country NVARCHAR(50),
	@AnnualBilling NUMERIC(15)
)
AS
BEGIN

INSERT INTO [dbo].[Suppliers] 
	  ([CompanyName]
      ,[Name]
      ,[TaxIdentification]
      ,[PhoneNumber]
      ,[Email]
      ,[WebSite]
      ,[Address]
      ,[Country]
      ,[AnnualBilling]
      ,[LastModified])
VALUES 
	(@CompanyName,
	@Name,
	@TaxIdentification,
	@PhoneNumber,
	@Email,
	@WebSite,
	@Address,
	@Country,
	@AnnualBilling,
	GETDATE())

END;

GO

CREATE PROCEDURE SP_GET_SUPPLIERS
AS
BEGIN
	SELECT [Id]
      ,[CompanyName]
      ,[Name]
      ,[TaxIdentification]
      ,[PhoneNumber]
      ,[Email]
      ,[WebSite]
      ,[Address]
      ,[Country]
      ,[AnnualBilling]
      ,[LastModified]
	FROM [dbo].[Suppliers]
END;

GO

CREATE PROCEDURE SP_UPDATE_SUPPLIER (
	@Id INT,
	@CompanyName VARCHAR(50),
	@Name VARCHAR(50),
	@TaxIdentification NUMERIC(11),
	@PhoneNumber NVARCHAR(9),
	@Email NVARCHAR(255),
	@WebSite NVARCHAR(50),
	@Address NVARCHAR(50),
	@Country NVARCHAR(50),
	@AnnualBilling NUMERIC(15)
)
AS
BEGIN

UPDATE [dbo].[Suppliers]
   SET [CompanyName] = @CompanyName
      ,[Name] = @Name
      ,[TaxIdentification] = @TaxIdentification
      ,[PhoneNumber] = @PhoneNumber
      ,[Email] = @Email
      ,[WebSite] = @WebSite
      ,[Address] = @Address
      ,[Country] = @Country
      ,[AnnualBilling] = @AnnualBilling
      ,[LastModified] = GETDATE()
 WHERE Id = @Id

END;

GO

CREATE PROCEDURE SP_DELETE_SUPPLIER
	@IdSupplier INT
AS
BEGIN

	DELETE FROM [dbo].[Suppliers] WHERE Id = @IdSupplier;

END;

GO

CREATE TABLE Users (
	Id INT PRIMARY KEY IDENTITY,
	Username VARCHAR(50) NOT NULL,
	Password VARCHAR(100) NOT NULL
);


INSERT INTO [dbo].[Users](Username, Password) VALUES('testUser','af0426e71dd57c0fdf93f23f6f191a4aa0578ad7d71897e936746028b8ffd31d')

GO

CREATE PROCEDURE SP_GET_USER_BY_USERNAME
	@Username VARCHAR(50)
AS
BEGIN

	SELECT * FROM [dbo].[Users] WHERE Username = @Username

END;

GO