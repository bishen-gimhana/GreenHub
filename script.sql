USE [master]
GO
/****** Object:  Database [GreenHub]    Script Date: 5/19/2023 8:41:19 AM ******/
CREATE DATABASE [GreenHub]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GreenHub', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\GreenHub.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GreenHub_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\GreenHub_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [GreenHub] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GreenHub].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GreenHub] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GreenHub] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GreenHub] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GreenHub] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GreenHub] SET ARITHABORT OFF 
GO
ALTER DATABASE [GreenHub] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [GreenHub] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GreenHub] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GreenHub] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GreenHub] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GreenHub] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GreenHub] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GreenHub] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GreenHub] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GreenHub] SET  DISABLE_BROKER 
GO
ALTER DATABASE [GreenHub] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GreenHub] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GreenHub] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GreenHub] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GreenHub] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GreenHub] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GreenHub] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GreenHub] SET RECOVERY FULL 
GO
ALTER DATABASE [GreenHub] SET  MULTI_USER 
GO
ALTER DATABASE [GreenHub] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GreenHub] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GreenHub] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GreenHub] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GreenHub] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GreenHub] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'GreenHub', N'ON'
GO
ALTER DATABASE [GreenHub] SET QUERY_STORE = ON
GO
ALTER DATABASE [GreenHub] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [GreenHub]
GO
/****** Object:  Table [dbo].[categoryDetails]    Script Date: 5/19/2023 8:41:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categoryDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[categoryName] [nvarchar](50) NULL,
 CONSTRAINT [PK_category_details] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[itemDetails]    Script Date: 5/19/2023 8:41:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[itemDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[itemName] [nvarchar](50) NULL,
	[imgPath] [nvarchar](550) NULL,
	[description] [nvarchar](550) NULL,
	[categoryId] [nvarchar](50) NULL,
	[userId] [int] NULL,
	[qty] [int] NULL,
	[type] [nvarchar](2) NULL,
	[price] [decimal](18, 2) NULL,
	[expireDate] [datetime] NULL,
	[isActive] [nvarchar](1) NULL,
 CONSTRAINT [PK_item_details] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[orderDetails]    Script Date: 5/19/2023 8:41:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orderDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[itemId] [int] NULL,
	[buyerId] [int] NULL,
	[type] [nvarchar](1) NULL,
	[status] [nvarchar](8) NULL,
	[pickupTime] [datetime] NULL,
	[orderDate] [datetime] NULL,
	[paymentId] [nvarchar](50) NULL,
 CONSTRAINT [PK_orderDetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[userDetails]    Script Date: 5/19/2023 8:41:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[userDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fname] [nvarchar](50) NULL,
	[lname] [nvarchar](50) NULL,
	[imgUrl] [nvarchar](500) NULL,
	[userLocationLongtitute] [nvarchar](50) NULL,
	[userLocationLatititute] [nvarchar](50) NULL,
	[userName] [nvarchar](50) NULL,
	[password] [nvarchar](50) NULL,
	[tp] [nvarchar](10) NULL,
	[address] [nvarchar](250) NULL,
	[type] [nvarchar](5) NULL,
	[stripeUserId] [nvarchar](20) NULL,
	[bioDetails] [nvarchar](1000) NULL,
 CONSTRAINT [PK_userDetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[userNotification]    Script Date: 5/19/2023 8:41:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[userNotification](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[senderId] [int] NULL,
	[status] [nvarchar](1) NULL,
	[description] [nvarchar](550) NULL,
	[itemId] [int] NULL,
	[receiverId] [int] NULL,
	[type] [nvarchar](1) NULL,
 CONSTRAINT [PK_userNotification] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[itemDetails] ON 

INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (5, N'Carrot', N'carrot_2.jpg', N'Carrot test 1', N'1', 3, 5, N'S', CAST(1500.00 AS Decimal(18, 2)), CAST(N'2023-05-19T05:30:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (6, N'Beetroot', N'beetroot.jpg', N'Beetroot test 1', N'1', 3, 5, N'S', CAST(1500.00 AS Decimal(18, 2)), CAST(N'2023-05-16T00:00:00.000' AS DateTime), N'A')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (9, N'Mango', N'132ceaf9-a843-4e52-989d-1ea0ed471066.jpeg', N'Fresh mango', N'0', 3, 10, N'S', CAST(250.00 AS Decimal(18, 2)), CAST(N'2023-05-20T10:10:10.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (10, N'Sweet potato q', N'612564f1-7679-4236-8b63-24c409d092f7.jpeg', N'Best one', N'0', 9, 56, N'E', CAST(300.00 AS Decimal(18, 2)), CAST(N'2023-05-20T05:30:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (11, N'Papaya ', N'6c1cf1af-357c-4e62-bef1-5d5d2ee65d30.jpeg', N'My lady ', N'0', 9, 56, N'F', CAST(300.00 AS Decimal(18, 2)), CAST(N'2023-05-20T10:10:10.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (12, N'watermelon', N'whole-and-slices-watermelon.webp', N'water melon test desc', NULL, 4, 12, N'S', CAST(220.00 AS Decimal(18, 2)), CAST(N'2023-05-18T05:30:00.000' AS DateTime), N'A')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (13, N'Redbull', N'4bea9d11-247a-4818-9516-88501126ae7f.jpeg', N'Cool', N'0', 3, 1, N'S', CAST(900.00 AS Decimal(18, 2)), CAST(N'2020-05-20T10:10:10.000' AS DateTime), N'A')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (16, N'Sprite', N'132ceaf9-a843-4e52-989d-1ea0ed471066.jpeg', N'Cool', N'0', 3, 1, N'S', CAST(900.00 AS Decimal(18, 2)), CAST(N'2023-06-30T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (17, N'chair', N'78E6C61C-2198-4F98-8B15-20E6A450E56B.png', N'old chair', N'0', 3, 5, N'E', CAST(250.00 AS Decimal(18, 2)), CAST(N'2023-07-21T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (18, N'Jambu', N'4bea9d11-247a-4818-9516-88501126ae7f.jpeg', N'Fresh jambu', NULL, 3, 19, N'E', CAST(250.00 AS Decimal(18, 2)), CAST(N'2023-05-17T00:00:00.000' AS DateTime), N'A')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (19, N'Apple red', N'logo@2x.png', N'Fresh apple', NULL, 3, 10, N'F', CAST(300.00 AS Decimal(18, 2)), CAST(N'2024-04-16T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (20, N'Keyboard ', N'908af410-ac06-4e4e-a09e-d897f2ab00dc.jpeg', N'Dell', NULL, 3, 3, N'S', CAST(459.00 AS Decimal(18, 2)), CAST(N'2023-05-31T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (21, N'Mug', N'cc2b2c4f-7b3b-48ea-b0aa-e2ed3ad61538.jpeg', N'New', NULL, 3, 3, N'E', CAST(300.00 AS Decimal(18, 2)), CAST(N'2023-05-26T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (22, N'Mug 2', N'cc2b2c4f-7b3b-48ea-b0aa-e2ed3ad61538.jpeg', N'Old', NULL, 3, 4, N'E', CAST(450.00 AS Decimal(18, 2)), CAST(N'2023-05-26T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (23, N'Fast chager', N'6c0ba6d0-cc04-4bf0-aa46-e80d20e5f01b.jpeg', N'Samsung chager', NULL, 3, 5, N'S', CAST(3000.00 AS Decimal(18, 2)), CAST(N'2023-05-31T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (24, N'Sun glass ', N'214f17fb-d4ab-4bf1-a728-e11440ae119d.jpeg', N'Brand new ', NULL, 3, 7, N'E', CAST(2800.00 AS Decimal(18, 2)), CAST(N'2023-06-30T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (25, N'Lap top', N'8c07e6a7-5142-4e9d-ae29-8b4d8445e25d.jpeg', N'Dell hdbsisjsbshsus
Sushjs
Shsusus
Sushsus
Sysusuw', NULL, 3, 3, N'E', CAST(890000.00 AS Decimal(18, 2)), CAST(N'2023-08-26T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (26, N'Wallet ', N'9c91d23d-40f8-40ef-96a9-ebe1d515f64b.jpeg', N'Imported ', NULL, 3, 20, N'F', CAST(8000.00 AS Decimal(18, 2)), CAST(N'2023-09-22T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (27, N'Apple ', N'5A64080C-7665-4E71-BF20-C18825ADA533.jpg', N'Red fresh ', NULL, 16, 3, N'E', CAST(300.00 AS Decimal(18, 2)), CAST(N'2023-05-22T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (28, N'Banana', N'F674058B-461D-4B5A-86F5-B2F3BFBB9159.png', N'fresh Banana', NULL, 17, 3, N'S', CAST(300.00 AS Decimal(18, 2)), CAST(N'2023-05-20T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (29, N'Red Apple', N'B607442A-1572-4467-8C61-70BEAFB96D43.jpg', N'fresh red apple ', NULL, 17, 3, N'S', CAST(300.00 AS Decimal(18, 2)), CAST(N'2023-05-20T00:00:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (30, N'Green chilli', N'EF011702-0974-4135-9356-10AB0640883A.png', N'Home food, hot green chille  ', NULL, 17, 10, N'E', CAST(150.00 AS Decimal(18, 2)), CAST(N'2023-05-20T00:00:00.000' AS DateTime), N'A')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (31, N'Tommato', N'6210CFA9-7295-416B-B9DC-E1594644D06B.png', N'Home food, fresh tomatoes for donate  ', NULL, 17, 10, N'F', CAST(150.00 AS Decimal(18, 2)), CAST(N'2023-05-20T00:00:00.000' AS DateTime), N'A')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (32, N'Mango', N'download (4).jpg', N'fresh home fruit , Mango ', NULL, 3, 3, N'S', CAST(300.00 AS Decimal(18, 2)), CAST(N'2023-05-21T05:30:00.000' AS DateTime), N'N')
INSERT [dbo].[itemDetails] ([id], [itemName], [imgPath], [description], [categoryId], [userId], [qty], [type], [price], [expireDate], [isActive]) VALUES (33, N'Apple', N'BF86E439-442E-4BFC-8E3C-10A9788DE572.jpg', N'I have apple for sale', NULL, 18, 3, N'S', CAST(300.00 AS Decimal(18, 2)), CAST(N'2023-05-25T00:00:00.000' AS DateTime), N'A')
SET IDENTITY_INSERT [dbo].[itemDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[orderDetails] ON 

INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (1, 5, 3, N'S', N'Pending', CAST(N'2023-05-19T05:30:00.000' AS DateTime), CAST(N'2023-05-15T00:00:00.000' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (2, 5, 9, N'S', N'Complete', NULL, CAST(N'2023-05-16T13:33:04.623' AS DateTime), N'ch_3N8IKbFvtjn7jcLz0lcxya4y')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (3, 9, 3, N'S', N'Complete', NULL, CAST(N'2023-05-16T13:33:34.820' AS DateTime), N'ch_3N8Ir4Fvtjn7jcLz1BJIhgJh')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (4, 10, 3, N'E', N'Pending', NULL, CAST(N'2023-05-16T13:36:36.373' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (5, 11, 3, N'F', N'Pending', NULL, CAST(N'2023-05-16T13:39:45.170' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (6, 16, 3, N'S', N'Complete', NULL, CAST(N'2023-05-16T13:40:07.467' AS DateTime), N'ch_3N8IxOFvtjn7jcLz0bL2H7mO')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (7, 17, 3, N'E', N'Pending', NULL, CAST(N'2023-05-16T13:51:44.620' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (8, 5, 3, N'S', N'Complete', NULL, CAST(N'2023-05-16T16:26:15.963' AS DateTime), N'ch_3N8LYBFvtjn7jcLz1aAQSh6U')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (9, 9, 10, N'S', N'Complete', NULL, CAST(N'2023-05-16T17:07:58.067' AS DateTime), N'ch_3N8MCXFvtjn7jcLz1LLdAOcL')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (10, 9, 10, N'S', N'Complete', NULL, CAST(N'2023-05-16T17:09:50.900' AS DateTime), N'ch_3N8MEMFvtjn7jcLz0e2v3Lvn')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (11, 11, 3, N'F', N'Pending', NULL, CAST(N'2023-05-16T21:59:29.860' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (12, 10, 3, N'E', N'Pending', NULL, CAST(N'2023-05-16T21:59:48.700' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (13, 16, 3, N'S', N'Complete', NULL, CAST(N'2023-05-16T22:00:17.210' AS DateTime), N'ch_3N8QlQFvtjn7jcLz13ALqwgG')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (14, 12, 3, N'S', N'Complete', NULL, CAST(N'2023-05-16T22:01:00.573' AS DateTime), N'ch_3N8Qm7Fvtjn7jcLz1BKxVv5y')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (15, 5, 3, N'S', N'Complete', NULL, CAST(N'2023-05-16T22:01:27.087' AS DateTime), N'ch_3N8QmYFvtjn7jcLz1Qd8hx2H')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (16, 9, 10, N'S', N'Complete', NULL, CAST(N'2023-05-16T22:02:55.057' AS DateTime), N'ch_3N8QnyFvtjn7jcLz1iVwA2qa')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (17, 10, 10, N'E', N'Pending', NULL, CAST(N'2023-05-16T22:04:55.870' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (18, 11, 10, N'F', N'Pending', NULL, CAST(N'2023-05-16T22:06:52.503' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (19, 16, 10, N'S', N'Complete', NULL, CAST(N'2023-05-16T22:10:31.813' AS DateTime), N'ch_3N8QvKFvtjn7jcLz0HbQk1x1')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (20, 17, 10, N'E', N'Pending', NULL, CAST(N'2023-05-16T22:11:24.547' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (21, 12, 3, N'S', N'Complete', NULL, CAST(N'2023-05-16T22:13:20.090' AS DateTime), N'ch_3N8Qy2Fvtjn7jcLz1t1DwJVi')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (22, 5, 10, N'S', N'Complete', NULL, CAST(N'2023-05-16T22:15:27.123' AS DateTime), N'ch_3N8R06Fvtjn7jcLz1J0kwlrT')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (23, 9, 10, N'S', N'Complete', NULL, CAST(N'2023-05-16T22:16:38.347' AS DateTime), N'ch_3N8R1FFvtjn7jcLz0zQol2KZ')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (24, 10, 3, N'E', N'Pending', NULL, CAST(N'2023-05-16T22:33:08.357' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (25, 11, 3, N'F', N'Pending', NULL, CAST(N'2023-05-16T22:43:18.040' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (26, 16, 3, N'S', N'Complete', NULL, CAST(N'2023-05-16T22:43:24.177' AS DateTime), N'ch_3N8RR9Fvtjn7jcLz1jFsCccv')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (27, 12, 3, N'E', N'Pending', NULL, CAST(N'2023-05-17T02:26:07.687' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (28, 5, 3, N'E', N'Pending', NULL, CAST(N'2023-05-17T03:09:39.970' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (29, 9, 3, N'E', N'Pending', NULL, CAST(N'2023-05-17T03:09:48.377' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (30, 17, 3, N'E', N'Pending', NULL, CAST(N'2023-05-17T03:54:31.607' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (31, 10, 3, N'E', N'Pending', NULL, CAST(N'2023-05-17T03:55:58.450' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (32, 16, 3, N'E', N'Pending', NULL, CAST(N'2023-05-17T04:04:10.107' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (33, 11, 3, N'E', N'Pending', NULL, CAST(N'2023-05-17T04:04:34.003' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (34, 19, 3, N'F', N'Pending', NULL, CAST(N'2023-05-18T13:15:27.007' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (35, 20, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T14:38:42.390' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (36, 20, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T14:39:12.690' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (37, 20, 3, N'S', N'Complete', NULL, CAST(N'2023-05-18T14:39:28.770' AS DateTime), N'ch_3N92puFvtjn7jcLz1XpAGvX6')
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (38, 20, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T14:39:38.487' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (39, 21, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T14:44:01.757' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (40, 22, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T14:48:30.773' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (41, 23, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T14:51:19.137' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (42, 24, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T16:46:34.563' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (43, 11, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T18:03:40.187' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (44, 10, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T22:33:23.107' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (45, 17, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T22:33:34.243' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (46, 5, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T22:33:57.447' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (47, 19, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T22:34:40.630' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (48, 5, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T23:44:07.803' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (49, 9, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T23:44:42.417' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (50, 16, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T23:47:30.190' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (51, 20, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T23:49:18.470' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (52, 23, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T23:50:23.233' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (53, 5, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T23:51:37.347' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (54, 9, 3, N'E', N'Pending', NULL, CAST(N'2023-05-18T23:56:59.353' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (55, 10, 3, N'E', N'Pending', NULL, CAST(N'2023-05-19T01:52:36.723' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (56, 5, 3, N'E', N'Pending', NULL, CAST(N'2023-05-19T01:56:23.793' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (57, 11, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T02:39:13.000' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (58, 16, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T02:41:02.797' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (59, 17, 3, N'E', N'Pending', NULL, CAST(N'2023-05-19T02:44:22.820' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (60, 21, 3, N'E', N'Pending', NULL, CAST(N'2023-05-19T02:44:39.630' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (61, 22, 16, N'E', N'Pending', NULL, CAST(N'2023-05-19T04:32:24.450' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (62, 27, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T05:14:03.767' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (63, 20, 3, N'E', N'Pending', NULL, CAST(N'2023-05-19T05:24:51.890' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (64, 25, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T05:46:30.750' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (65, 24, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T05:49:08.220' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (66, 19, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T05:51:50.533' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (67, 26, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T06:25:25.293' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (68, 28, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T06:26:08.503' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (69, 32, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T08:18:07.157' AS DateTime), NULL)
INSERT [dbo].[orderDetails] ([id], [itemId], [buyerId], [type], [status], [pickupTime], [orderDate], [paymentId]) VALUES (70, 29, 17, N'E', N'Pending', NULL, CAST(N'2023-05-19T08:19:47.367' AS DateTime), NULL)
SET IDENTITY_INSERT [dbo].[orderDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[userDetails] ON 

INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (3, N'ryan123', N'liyanage', N'IMG_0454.JPG', N'7.3966417382216125', N'80.7484373524878', N'ryan', N'ryan123', N'711397206', N'Kadawatha', N'Admin', N'cus_NtXgRYDQ0PTxLx', N'ryan bio')
INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (4, N'chanaka', N'rajapaksha', N'IMG_0494.png', N'7.002467123353673', N'79.92571455688517', N'chanaka', N'chanaka123', N'711397206', N'Kadawatha', N'User', N'cus_NtXgRYDQ0PTxLx', N'')
INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (9, N'test', N'test', N'2d2a4592-001a-4310-8068-8e199b4e3ac4.jpeg', N'6.913313729145722', N'79.87264823546866', N'Yapa', N'12345', N'1234567890', N'aa', N'User', N'cus_Nu9X65J8rzf8f8', N'')
INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (10, N'binu', N'binu', N'28f3abd3-e48d-40b7-b04c-39c0aeaf35a0.jpeg', N'6.913475618628447', N'79.86167907714844', N'Binu', N'12345', N'1234567890', N'aa', N'User', NULL, NULL)
INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (11, N'abc', N'abc', N'3c609245-c50b-4c74-9dae-d2631e6fa670.jpeg', N'6.913475618628447', N'79.86167907714844', N'Abc', N'12345', N'1234567890', N'aa', N'User', NULL, NULL)
INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (12, N'nayana', N'lakshitha', N'B9AE9AC7-3A0F-4517-A470-DA707D919FCE.jpg', N'7.0673128412750845', N'79.99957048669268', N'nayana', N'12345', N'1234567890', N'aa', N'User', NULL, N'')
INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (13, N'niluha', N'nilusha', N'28f3abd3-e48d-40b7-b04c-39c0aeaf35a0.jpeg', N'6.92944232441908', N'79.89023357945882', N'Nilusha', N'12345', N'0712275742', N'boralasgamuwa ', N'User', NULL, N'')
INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (16, N'kavindi', N'yashi', N'109885EF-4C8C-42BA-8D24-F1BDAF1A9B47.png', N'6.438207509933448', N'80.11653780013333', N'kavi', N'yashi123', N'0778585855', N'panadura , sri lanka ', N'User', NULL, N'undefined')
INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (17, N'kev', N'udara', N'308E0CD6-9175-4126-A52A-2573924CD1ED.png', N'6.438227166876412', N'80.11650848046409', N'kevin', N'kev123', N'0775812361', N'homagama ,sri lanka', N'User', N'cus_Nv6hvpLSjEcXij', N'i am fond of farming')
INSERT [dbo].[userDetails] ([id], [fname], [lname], [imgUrl], [userLocationLongtitute], [userLocationLatititute], [userName], [password], [tp], [address], [type], [stripeUserId], [bioDetails]) VALUES (18, N'malinda', N'mali', N'5D7B28A9-F72D-4303-B4A1-AC7B43E65B7F.png', N'6.4382175682172536', N'80.116719268337', N'malinda', N'mali123', N'0778855605', N'katuneriya , sri lanka', N'User', NULL, N'undefined')
SET IDENTITY_INSERT [dbo].[userDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[userNotification] ON 

INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (1, 3, N'N', N'Carrot 5 kg exchange request', 5, 4, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (3, 3, N'A', N'test des', 5, 9, N'R')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (4, 3, N'A', N'Accepted', 9, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (5, 3, N'A', N'Rejected', 10, 9, N'R')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (6, 3, N'A', N'Rejected', 16, 3, N'R')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (20, 3, N'A', N'Rejected', 23, 3, N'R')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (21, 3, N'A', N'Accepted', 11, 9, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (22, 3, N'A', N'Rejected', 5, 3, N'R')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (23, 3, N'A', N'Accepted', 19, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (24, 3, N'A', N'Accepted', 5, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (25, 3, N'A', N'Rejected', 9, 3, N'R')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (26, 3, N'A', N'Rejected', 16, 3, N'R')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (27, 3, N'A', N'Accepted', 20, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (28, 3, N'A', N'Accepted', 23, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (29, 3, N'A', N'Accepted', 5, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (31, 3, N'A', N'Rejected', 9, 3, N'R')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (32, 3, N'A', N'Accepted', 5, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (33, 17, N'A', N'Accepted', 11, 9, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (34, 17, N'A', N'Accepted', 16, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (35, 3, N'A', N'i have apple for exchnage', 20, 3, N'N')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (36, 17, N'A', N'Accepted', 23, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (37, 17, N'A', N'Accepted', 19, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (38, 17, N'A', N'Accepted', 26, 3, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (39, 17, N'A', N'Accepted', 28, 17, N'A')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (40, 17, N'A', N'Rejected', 32, 3, N'R')
INSERT [dbo].[userNotification] ([id], [senderId], [status], [description], [itemId], [receiverId], [type]) VALUES (41, 17, N'A', N'Accepted', 29, 17, N'A')
SET IDENTITY_INSERT [dbo].[userNotification] OFF
GO
ALTER TABLE [dbo].[itemDetails]  WITH CHECK ADD  CONSTRAINT [FK_itemDetails_userDetails] FOREIGN KEY([userId])
REFERENCES [dbo].[userDetails] ([id])
GO
ALTER TABLE [dbo].[itemDetails] CHECK CONSTRAINT [FK_itemDetails_userDetails]
GO
ALTER TABLE [dbo].[orderDetails]  WITH CHECK ADD  CONSTRAINT [FK_orderDetails_itemDetails] FOREIGN KEY([itemId])
REFERENCES [dbo].[itemDetails] ([id])
GO
ALTER TABLE [dbo].[orderDetails] CHECK CONSTRAINT [FK_orderDetails_itemDetails]
GO
ALTER TABLE [dbo].[orderDetails]  WITH CHECK ADD  CONSTRAINT [FK_orderDetails_user_details] FOREIGN KEY([buyerId])
REFERENCES [dbo].[userDetails] ([id])
GO
ALTER TABLE [dbo].[orderDetails] CHECK CONSTRAINT [FK_orderDetails_user_details]
GO
ALTER TABLE [dbo].[userNotification]  WITH CHECK ADD  CONSTRAINT [FK_userNotification_itemDetails] FOREIGN KEY([itemId])
REFERENCES [dbo].[itemDetails] ([id])
GO
ALTER TABLE [dbo].[userNotification] CHECK CONSTRAINT [FK_userNotification_itemDetails]
GO
ALTER TABLE [dbo].[userNotification]  WITH CHECK ADD  CONSTRAINT [FK_userNotification_userDetailsReciever] FOREIGN KEY([receiverId])
REFERENCES [dbo].[userDetails] ([id])
GO
ALTER TABLE [dbo].[userNotification] CHECK CONSTRAINT [FK_userNotification_userDetailsReciever]
GO
ALTER TABLE [dbo].[userNotification]  WITH CHECK ADD  CONSTRAINT [FK_userNotification_userDetailsSender] FOREIGN KEY([senderId])
REFERENCES [dbo].[userDetails] ([id])
GO
ALTER TABLE [dbo].[userNotification] CHECK CONSTRAINT [FK_userNotification_userDetailsSender]
GO
USE [master]
GO
ALTER DATABASE [GreenHub] SET  READ_WRITE 
GO
