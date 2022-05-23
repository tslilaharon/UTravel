
--Users Table
Create Table [Users]
( 
  [User_Id] int IDENTITY(1,1) Not null CONSTRAINT User_Id_pk PRIMARY KEY,
  [User_Name] NVarchar(50) Not null,
  [Email] varchar(50) Not null ,
  [Password]  NVarchar(50) Not null,
  [Image] NVarchar(Max) null
)
go

-- User

--- v
Create proc RegisterUser
    @User_Name NVarchar(50),
	@Email varchar(50),
	@Password NVarchar(50),
	@User_Id int output
as
	if exists (Select * from [dbo].[Users] where [Email] = @Email)
		Set @User_Id = -1
	else
		begin
			insert into dbo.Users ([User_Name] , [Email], [Password])
				values (@User_Name , @Email , @Password)
			Set @User_Id = @@IDENTITY
		end
go

--- v
Create proc LoginUser
    @Email varchar(50),
	@Password NVarchar(50)
as
	Select * from [dbo].[Users] where [Email] = @Email and [Password] = @Password
go

--- v
alter proc Forgot_Password
	@Email varchar(50),
	@New_Password NVarchar(50),
	@Status Varchar(10) output
as
    if exists (Select * from [dbo].[Users] where [Email] = @Email)
		begin 
			Update Users
				Set [Password] = @New_Password
				where [Email] = @Email
			set @Status = 'ok'
		end
	else
		set @Status = 'error'
go

--- v
Create proc Profile_Details
	@User_Id int
as
	Select * from [dbo].[Users] where [User_Id] = @User_Id
go

--- v
Create proc Edit_User
    @User_Id int,
	@User_Name NVarchar(50),
	@Email varchar(50),
	@Image NVarchar(max)
as
	Update Users
	Set [User_Name] = @User_Name , [Email] = @Email , [Image] = @Image
	where [User_Id] = @User_Id
go

--- v
Alter proc Delete_User
	 @User_Id int
as
	Delete from [dbo].[Reviews] where [User_Id] = @User_Id
	Delete from [dbo].[Users] where [User_Id] = @User_Id
go

--- v
Create proc SelectAllUsers
as
Select * from [dbo].[Users]
order by [User_Id]
go

--Business Table

--- v
Create Table [Business]
(
  [Business_Id] int IDENTITY Not null CONSTRAINT Business_Id_pk PRIMARY KEY,
  [Business_Name] NVarchar(100) Not null,
  [Owner_Name] NVarchar(100) Not null,
  [Email] varchar(50) Not null ,
  [Password]  NVarchar(50) Not null,
  [Terms] bit Not null,
  [Image] NVarchar(Max) null
)
go

-- Bussines Users

--- v
Create proc RegisterBusiness
	@Business_Name NVarchar(100),
    @Owner_Name NVarchar(100),
	@Email varchar(50),
	@Password NVarchar(50),
	@Terms bit,
	@Business_Id int output
as
	if exists (Select * from [dbo].[Business] where [Email] = @Email and [Business_Name] = @Business_Name)
		Set @Business_Id = -1
	else
		begin
			insert into [dbo].[Business] ([Business_Name] , [Owner_Name] , [Email] , [Password], [Terms])
				values (@Business_Name , @Owner_Name , @Email , @Password, @Terms)
			Set @Business_Id = @@IDENTITY
		end
go

--- v
Create proc LoginBusiness
    @Email varchar(50),
	@Password NVarchar(50)
as
	Select * from [dbo].[Business] where [Email] = @Email and [Password] = @Password
go

--- v
alter proc ForgotPassword_Business
	@Email varchar(50),
	@New_Password NVarchar(50),
	@Status Varchar(10) output
as
    if exists (Select * from [dbo].[Users] where [Email] = @Email)
		begin 
			Update Users
				Set [Password] = @New_Password
				where [Email] = @Email
			set @Status = 'ok'
		end
	else
		set @Status = 'error'
go

--- v
Create proc BusinessProfile_Details
	@Business_Id int
as
	Select * from [dbo].[Business] where [Business_Id] = @Business_Id
go

--- v
Create proc Edit_Business
    @Business_Id int,
	@Business_Name NVarchar(100),
	@Owner_Name NVarchar(100),
	@Email varchar(50),
	@Image NVarchar(Max)
as
	Update Business
	Set [Business_Name] = @Business_Name, [Owner_Name] = @Owner_Name , [Email] = @Email, [Image] = @Image
	where [Business_Id] = @Business_Id
go

--- v
Create proc Delete_Business
	 @Business_Id int
as
	Delete from [dbo].[Attraction] where [Business_Id] = @Business_Id
	Delete from [dbo].[Business] where [Business_Id] = @Business_Id
go

--- v
Create proc SelectAllBusiness
as
Select * from [dbo].[Business]
order by [Business_Id]
go

--Cities Table
Create Table [Cities]
( 
  [City_Id] int IDENTITY(1,1) Not null CONSTRAINT City_Id_pk PRIMARY KEY,
  [City_Name] NVarchar(50) Not null,
  [Country] NVarchar(50) Not null,
  [Title] NVarchar(50) Not null,
  [Information] NVarchar(100) Not null,
  [language] NVarchar(50) Not null,
  [Currency] NVarchar(50) Not null,
  [Weather] NVarchar(50) Not null,
  [Rating_Star] tinyint Not null,
  [Image] NVarchar(Max) null
)
go

-- Cities

--- v
Alter proc AddCity
	@City_Name NVarchar(50),
    @Country NVarchar(50),
	@Title NVarchar(50),
	@Information NVarchar(100),
	@language NVarchar(50),
	@Currency NVarchar(50),
	@Weather NVarchar(50),
	@Rating_Star tinyint,
	@Image NVarchar(Max),
	@City_Id int output
as
	if exists (Select * from [dbo].[Cities] where [City_Name] = @City_Name)
		Set @City_Id = -1
	else
		begin
			insert into [dbo].[Cities] ([City_Name], [Country], [Title] ,[Information], [language], [Currency], [Weather], [Rating_Star], [Image])
				values (@City_Name , @Country , @Title , @Information , @language , @Currency , @Weather, @Rating_Star, @Image)
			Set @City_Id = @@IDENTITY
		end
go

--- v
Create proc Edit_City
    @City_Id int,
	@City_Name NVarchar(50),
    @Country NVarchar(50),
	@Title NVarchar(50),
	@Information NVarchar(100),
	@language NVarchar(50),
	@Currency NVarchar(50),
	@Weather NVarchar(50),
	@Rating_Star tinyint,
	@Image NVarchar(Max)

as
	Update Cities
	Set [City_Name] = @City_Name , [Country] = @Country , [Title] = @Title ,[Information] = @Information , [language] = @language,
	[Currency] = @Currency , [Weather] = @Weather ,  [Rating_Star] = @Rating_Star, [Image] = @Image
	where [City_Id] = @City_Id
go

--- v
Create proc Delete_City
	 @City_Id int
as
	Delete from [dbo].[Cities] where [City_Id] = @City_Id
go

--- v
Create proc SelectAllCities
as
Select * from [dbo].[Cities]
order by [City_Id]
go

--- X
Create proc SelectCityIdByName
	@City_Name NVarchar(50)
as
	Select [City_Id] from [dbo].[Cities] where [City_Name] = @City_Name
go

--- v
Create proc SelectCityById
	@City_Id Int
as
	Select * from [dbo].[Cities] where [City_Id] = @City_Id
go

--- X
Create proc SelectCityByCityName
	@City_Name NVarchar(50)
as
	Select * from [dbo].[Cities] where [City_Name] = @City_Name
go

--Attraction Table
Create Table [Attraction]
( 
  [Attraction_Id] int IDENTITY(1,1) Not null CONSTRAINT Attraction_Id_pk PRIMARY KEY, 
  [Attraction_Name] NVarchar(50) Not null,
  [Business_Id] int Not null FOREIGN KEY (Business_Id) REFERENCES Business(Business_Id), 
  [City_Id]  int Not null FOREIGN KEY (City_Id) REFERENCES Cities(City_Id),
  [City_Name] NVarchar(50) Not null,
  [Address] NVarchar(50) Not null,
  [Open_Hour] NVarchar(50) Not null,
  [Close_Hour] NVarchar(50) Not null,
  [Rating] Float Not null ,
  [Rating_Star] tinyint Not null ,
  [Stock_Quantity] tinyint Not null,
  [In_Stock] bit Not null,
  [Price] float Not null,
  [Category] NVarchar(50) Not null ,
  [Title] NVarchar(50) Not null,
  [Information] NVarchar(100) Not null,
  [Image] NVarchar(Max) null
)
go

--- v
Create proc AddAttraction
    @Attraction_Name NVarchar(50),
    @City_Name NVarchar(50),
	@Address NVarchar(50),
	@Open_Hour NVarchar(50),
	@Close_Hour NVarchar(50),
	@Rating Float,
	@Rating_Star tinyint,
    @Stock_Quantity tinyint,
    @In_Stock bit,
    @Price float,
	@Category NVarchar(50),
	@Title NVarchar(50),
    @Information NVarchar(100),
    @Image NVarchar(MAX),
	@Business_Id int,
	@City_Id int,
	@Attraction_Id int output
as	
	insert into [dbo].[Attraction] ([Attraction_Name], [City_Name] , [Address], [Open_Hour], [Close_Hour], 
	[Rating], [Rating_Star] , [Stock_Quantity] , [In_Stock] , [Price] , [Category] , [Title] , [Information] , [Image] , [Business_Id] , [City_Id])
		values (@Attraction_Name , @City_Name , @Address , @Open_Hour , @Close_Hour, @Rating, @Rating_Star , @Stock_Quantity,
		@In_Stock ,@Price, @Category , @Title ,@Information ,@Image , @Business_Id , @City_Id)

Set @Attraction_Id = @@IDENTITY
go

--- v
Create proc Edit_Attraction
    @Attraction_Id int ,
	@Attraction_Name NVarchar(50),
    @City_Name NVarchar(50),
	@Address NVarchar(50),
	@Open_Hour NVarchar(50),
	@Close_Hour NVarchar(50),
	@Rating Float,
	@Rating_Star tinyint,
    @Stock_Quantity tinyint,
    @In_Stock bit,
    @Price float,
	@Category NVarchar(50),
	@Title NVarchar(50),
    @Information NVarchar(100),
    @Image NVarchar(MAX)
as
	Update Attraction
	Set [Attraction_Name] = @Attraction_Name , [Category] = @Category , [City_Name] = @City_Name , [Address] = @Address,
	[Open_Hour] = @Open_Hour , [Close_Hour] = @Close_Hour , [Rating] = @Rating , [Rating_Star] = @Rating_Star ,
    [Stock_Quantity] = @Stock_Quantity , [In_Stock] = @In_Stock , [Price] = @Price , [Information] = @Information,
	[Image] = @Image
	where [Attraction_Id] = @Attraction_Id
go

--- v
Create proc Delete_Attraction
	 @Attraction_Id int
as
	Delete from [dbo].[Attraction] where [Attraction_Id] = @Attraction_Id
go

--- v
Create proc SelectAllAttractions
as
Select * from [dbo].[Attraction]
order by [Attraction_Id]
go

--- v
Create proc SelectAttractionsById
	@Attraction_Id int
as
	Select * from [dbo].[Attraction] where [Attraction_Id] = @Attraction_Id
go

--- X
Create proc SelectAttractionsByName
	@Attraction_Name NVarchar(50)
as
	Select * from [dbo].[Attraction] where [Attraction_Name] = @Attraction_Name
go

--- v
Create proc SelectAttractionsByBusinessId
	@Business_Id int
as
	Select * from [dbo].[Attraction] where [Business_Id] = @Business_Id
go

--- X
Create proc SelectAttractionsByCity
	@City_Name NVarchar(50)
as
	Select * from [dbo].[Attraction] where [City_Name] = @City_Name
go

--- X
Create proc SelectAttractionsByCityId
	@City_Id Int
as
	Select * from [dbo].[Attraction] where [City_Id] = @City_Id
go

--- X
Create proc SelectAttractionsByCategory
	@Category NVarchar(50)
as
	Select * from [dbo].[Attraction] where [Category] = @Category
	order by [Category]
go


--Reviews Table
Create Table [Reviews]
( 
  [Review_Id] int IDENTITY(1,1) Not null CONSTRAINT Reviews_Id_pk PRIMARY KEY,
  [User_Id] int Not null FOREIGN KEY (User_Id) REFERENCES Users(User_Id),
  [Attraction_Id] int Not null FOREIGN KEY (Attraction_Id) REFERENCES Attraction(Attraction_Id),
  [Rating_Star] tinyint Not null ,
  [Content] NVarchar(200) Not null,
)
go

--- V
create proc Attraction_Rating
	@Attraction_Id int
as
	Select AVG(Rating_Star) as Attraction_Rating from [dbo].[Reviews] where [Attraction_Id] = @Attraction_Id
go

-- Reviews

--- v
Create proc AddReview
	@User_Id int,
	@Attraction_Id int,
	@Rating_Star tinyint,
	@Content NVarchar(200),
	@Review_Id int output
as
	insert into [dbo].[Reviews] ([User_Id], [Attraction_Id], [Rating_Star], [Content])
	values (@User_Id, @Attraction_Id , @Rating_Star, @Content)
	Set @Review_Id = @@IDENTITY
	go

--- v
Create proc Edit_Review
    @Review_Id int,
	@Rating_Star tinyint,
	@Content NVarchar(200)
as
	Update Reviews
	Set [Rating_Star] = @Rating_Star , [Content] = @Content
	where [Review_Id] = @Review_Id
go

--- v
Create proc Delete_Review
    @Review_Id int
as
	Delete from [dbo].[Reviews] where [Review_Id] = @Review_Id
go

--- v
Create proc SelectReviewsByAttraction
	@Attraction_Id int
as
	Select * from [dbo].[Reviews] where [Attraction_Id] = @Attraction_Id
go

--- v
Create proc SelectReviewsByUser
	@User_Id NVarchar(50)
as
	Select * from [dbo].[Reviews] where [User_Id] = @User_Id
go

--- v
Create proc SelectReviewsByRating
	@Rating_Star tinyint
as
	Select * from [dbo].[Reviews] where [Rating_Star] = @Rating_Star
		order by [Rating_Star]
go


--Orders Table
Create Table [Orders]
(
  [Order_Id] int IDENTITY(1,1) Not null CONSTRAINT Orders_Id_pk PRIMARY KEY,
  [User_Id] int Not null FOREIGN KEY (User_Id) REFERENCES Users(User_Id),
  [Order_Date] DateTime Not null default getdate(),
  [Paid] bit Not Null default 0,
  [IsActive] bit Not null default 1,
  [Total_Price] float Not null,
  [Order_Info] NVarchar(50)
)
go

Create proc SelectAllOrders
as
	Select * From [dbo].[Orders]
	order by [Order_Id]
go


--- v
Create proc AddOrder
	@User_Id int,
	@Total_Price float,
	@Order_Info NVarchar(50),
	@Order_Id int output
as
	insert into [dbo].[Orders] ([User_Id], [Total_Price], [Order_Info])
		values (@User_Id, @Total_Price, @Order_Info )
	Set @Order_Id = @@IDENTITY
 go

--- v
Create proc Update_Order
    @Order_Id int,
	@User_Id int,
	@Paid bit,
	@Total_Price float,
	@Order_Info NVarchar(50),
	@IsActive bit
as
	Update Orders
	Set [Paid] = @Paid, [Total_Price] = @Total_Price, [Order_Info] = @Order_Info, [IsActive] = @IsActive
	where [Order_Id] = @Order_Id
go

--- v
Create proc Cancel_Order
	@Order_Id int
as
	Update [dbo].[Orders]
    Set [IsActive] = 0
    where [Order_Id] = @Order_Id
go

--- v
alter proc Delete_Order
    @Order_Id int
	
as
	Delete from [dbo].[ItemInOrder] where [Order_Id] = @Order_Id
	Delete from [dbo].[Orders] where [Order_Id] = @Order_Id
go

---
Create proc UpdateStockAfterDelete
	@Attraction_Id int,
	@Stock_Quantity tinyInt
as
	Update [dbo].[Attraction]
		Set [Stock_Quantity] = [Stock_Quantity] + @Stock_Quantity
			Where [Attraction_Id] = @Attraction_Id
go

--- v
Create proc Active_Order
	@Order_Id int
as
	Update [dbo].[Orders]
    Set [IsActive] = 1
    where [Order_Id] = @Order_Id
go
--- v
Create proc SelectOrder
	@Order_Id int
as
	Select * from [dbo].[Orders] where [Order_Id] = @Order_Id
go
--- v
Create proc UpdatePaid
	@Order_Id int,
	@Paid bit

as
	Update [dbo].[Orders]
    Set [Paid] = @Paid 
    where [Order_Id] = @Order_Id
go

--- v
Create proc SelectUserPaidOrder
	@User_Id int,
	@Paid bit
as
	Select * from [dbo].[Orders] where  [User_Id] = @User_Id and [Paid] = 1 
go


Create proc UpdateStock
	@Attraction_Id int,
	@Quantity int
as
		Update [dbo].[Attraction]
		Set [Stock_Quantity] -= @Quantity
		Where [Attraction_Id] = @Attraction_Id and [In_Stock] = 1
go


--Item in Order Table
create Table [ItemInOrder]
(
  [Order_Id] int Not Null FOREIGN KEY REFERENCES Orders(Order_Id),
  [Attraction_Id] int Not null FOREIGN KEY (Attraction_Id) REFERENCES Attraction(Attraction_Id),
  [Business_Id] int Not null FOREIGN KEY (Business_Id) REFERENCES Business(Business_Id),
  [Quantity] tinyint Not null,
  CONSTRAINT ItemInOrder_pk PRIMARY KEY (Order_Id , Attraction_Id)
)
go

create Table [ItemInOrder]
	Add [Reviewed] bit Not null default 0
go

alter proc AddItemToOrder
	@Order_Id int ,
	@Attraction_Id int ,
	@Business_Id int ,
	@Quantity tinyint OUTPUT
as
	(Select * from [dbo].[ItemInOrder] where [Attraction_Id] = @Attraction_Id)
		begin
		  insert into [dbo].[ItemInOrder] ([Order_Id], [Attraction_Id], [Business_Id], [Quantity])
			values(@Order_Id , @Attraction_Id ,@Business_Id, @Quantity)
		end

	Update [dbo].[Attraction] -- ����� �� �����
		set [Stock_Quantity] = [Stock_Quantity] - @Quantity
			where [Attraction_Id] = @Attraction_Id
go


Create proc DeleteItemFromOrder
    @Attraction_Id int
as
	Delete from [dbo].[ItemInOrder] where [Attraction_Id] = @Attraction_Id
go


Create proc SelectItem
    @Attraction_Id int
as
	Select * from [dbo].[ItemInOrder] where [Attraction_Id] = @Attraction_Id
go

Create proc SelectAttraction
    @Attraction_Id int
as
	Select * from [dbo].[ItemInOrder] where [Attraction_Id] = @Attraction_Id
go

Create proc Update_Reviewed
	@Order_Id int,
	@Attraction_Id int
as
	Update [dbo].[ItemInOrder]
    Set [Reviewed] = 1
    where [Order_Id] = @Order_Id and [Attraction_Id] = @Attraction_Id
go

Create proc SelectItemInOrder
	@Order_Id int
as
	Select * from [dbo].[ItemInOrder] where [Order_Id] = @Order_Id
go
exec SelectItemInOrder 153
Select * From ItemInOrder

-- Home screen procs
Create proc Top3Cities
as
	Select Top 3 * from [dbo].[Cities]
	order by [Rating_Star] desc 
go

Create proc PopularDestinations
as
	Select Top 10 * from [dbo].[Cities]
	order by [Rating_Star] desc
go

Create proc BestSellers
as
	Select Top 10 * from [dbo].[Attraction]
	order by [Rating] desc
go

Create proc BestDeals
as
	Select Top 4 * from [dbo].[Attraction]
	order by [Price] 
go

-- Business screen procs

Create proc SelectStockQtyByBusinessId
	@Business_Id int
as
	Select [Stock_Quantity] from [dbo].[Attraction] where [Business_Id] = @Business_Id
go

Create proc SelectInStockByBusinessId
	@Business_Id int
as
	Select [In_Stock] from [dbo].[Attraction] where [Business_Id] = @Business_Id
go

Create proc Tickets_Sold
	@Business_Id int
as
	Select [Attraction_Id] , [Quantity] from [dbo].[ItemInOrder] , [dbo].[Orders] where [Business_Id] = @Business_Id and [Paid] = 1
go