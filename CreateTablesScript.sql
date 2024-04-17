-- Create the Users table
CREATE TABLE `COP4710`.`Users` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateLastLoggedIn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FirstName` VARCHAR(50) NOT NULL DEFAULT '',
  `LastName` VARCHAR(50) NOT NULL DEFAULT '',
  `Login` VARCHAR(50) NOT NULL DEFAULT '',
  `Password` VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

-- Insert data into the Users table
INSERT INTO Users (FirstName, LastName, Login, Password) VALUES ('Rich', 'Leu', 'RichL', 'COP4331');
INSERT INTO Users (FirstName, LastName, Login, Password) VALUES ('Sam', 'Hill', 'SamH', 'Test');
INSERT INTO Users (FirstName, LastName, Login, Password) VALUES ('Rich', 'Leu', 'RichL', '5832a71366768098cceb7095efb774f2');
INSERT INTO Users (FirstName, LastName, Login, Password) VALUES ('Sam', 'Hill', 'SamH', '0cbc6611f5540bd0809a388dc95a615b');

-- Create the Colors table
CREATE TABLE `COP4710`.`Colors` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(50) NOT NULL DEFAULT '',
  `UserID` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

insert into Colors (Name,UserID) VALUES ('Blue',1);
insert into Colors (Name,UserID) VALUES ('White',1);
insert into Colors (Name,UserID) VALUES ('Black',1);
insert into Colors (Name,UserID) VALUES ('gray',1);
insert into Colors (Name,UserID) VALUES ('Magenta',1);
insert into Colors (Name,UserID) VALUES ('Yellow',1);
insert into Colors (Name,UserID) VALUES ('Cyan',1);
insert into Colors (Name,UserID) VALUES ('Salmon',1);
insert into Colors (Name,UserID) VALUES ('Chartreuse',1);
insert into Colors (Name,UserID) VALUES ('Lime',1);
insert into Colors (Name,UserID) VALUES ('Light Blue',1);
insert into Colors (Name,UserID) VALUES ('Light Gray',1);
insert into Colors (Name,UserID) VALUES ('Light Red',1);
insert into Colors (Name,UserID) VALUES ('Light Green',1);
insert into Colors (Name,UserID) VALUES ('Chiffon',1);
insert into Colors (Name,UserID) VALUES ('Fuscia',1);
insert into Colors (Name,UserID) VALUES ('Brown',1);
insert into Colors (Name,UserID) VALUES ('Beige',1);

insert into Colors (Name,UserID) VALUES ('Blue',3);
insert into Colors (Name,UserID) VALUES ('White',3);
insert into Colors (Name,UserID) VALUES ('Black',3);
insert into Colors (Name,UserID) VALUES ('gray',3);
insert into Colors (Name,UserID) VALUES ('Magenta',3);
insert into Colors (Name,UserID) VALUES ('Yellow',3);
insert into Colors (Name,UserID) VALUES ('Cyan',3);
insert into Colors (Name,UserID) VALUES ('Salmon',3);
insert into Colors (Name,UserID) VALUES ('Chartreuse',3);
insert into Colors (Name,UserID) VALUES ('Lime',3);
insert into Colors (Name,UserID) VALUES ('Light Blue',3);
insert into Colors (Name,UserID) VALUES ('Light Gray',3);
insert into Colors (Name,UserID) VALUES ('Light Red',3);
insert into Colors (Name,UserID) VALUES ('Light Green',3);
insert into Colors (Name,UserID) VALUES ('Chiffon',3);
insert into Colors (Name,UserID) VALUES ('Fuscia',3);
insert into Colors (Name,UserID) VALUES ('Brown',3);
insert into Colors (Name,UserID) VALUES ('Beige',3);