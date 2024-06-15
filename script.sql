CREATE DATABASE IF NOT EXISTS mm_route_service;

USE mm_route_service;

CREATE TABLE IF NOT EXISTS user(
    `UserID` varchar(100) CHARACTER SET utf8,
    `Active` tinyint(4) NOT NULL DEFAULT '1',
    `CreatedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedDate`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`UserID`)
);

CREATE TABLE IF NOT EXISTS trips (
    `RouteSessionID` varchar(100) CHARACTER SET utf8,
    `RouteSessionType` varchar(100) CHARACTER SET utf8,
    `TripID` varchar(100) CHARACTER SET utf8,
    `ThirdPartyReferenceID` varchar(100) CHARACTER SET utf8,
    `UserID` varchar(100) CHARACTER SET utf8,
    `StartedDate` timestamp NULL DEFAULT NULL,
    `CreatedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`RouteSessionID`),
    FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS location (
    `LocationID` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
    `Coordinates` POINT,
    `RouteSessionID` varchar(100) CHARACTER SET utf8,
    `UserID` varchar(100) CHARACTER SET utf8,
    `CreatedDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `UpdatedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`LocationID`),
    FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE,
    FOREIGN KEY (`RouteSessionID`) REFERENCES `trips` (`RouteSessionID`) ON DELETE CASCADE
);
