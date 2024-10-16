CREATE TABLE `customer` (
	`customerId` text PRIMARY KEY NOT NULL,
	`companyName` text,
	`contactName` text,
	`address` text,
	`city` text,
	`region` text,
	`postalCode` text,
	`country` text,
	`phone` text
);
--> statement-breakpoint
CREATE TABLE `detailOrder` (
	`detailOrderId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`orderId` integer NOT NULL,
	`productId` text NOT NULL,
	`unitPrice` numeric NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`orderId`) REFERENCES `order`(`orderId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`productId`) REFERENCES `product`(`productId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `order` (
	`orderId` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customerId` text NOT NULL,
	`orderDate` text,
	`shippingDate` text,
	`shippingName` text,
	`shippingAddress` text,
	`shippingCity` text,
	`shippingRegion` text,
	`shippingPostalCode` text,
	`shippingCountry` text,
	`shippingPhone` text,
	FOREIGN KEY (`customerId`) REFERENCES `customer`(`customerId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product` (
	`productId` text PRIMARY KEY NOT NULL,
	`productName` text NOT NULL,
	`description` text,
	`unitPrice` numeric NOT NULL
);
