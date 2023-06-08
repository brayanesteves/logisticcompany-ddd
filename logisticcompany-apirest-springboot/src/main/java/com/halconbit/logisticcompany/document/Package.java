package com.halconbit.logisticcompany.document;

import java.time.LocalDate;
import java.util.List;

@Document
public class Package {
    @Id
    private String id;
    private String trackingNumber;
    private String currentLocation;
    private String status;
    private List<LocationHistory> locationHistory;
    private LocalDate deliveryDate;
    private String owner;
    private String action;
    private String sendEmail;
    private String sendSMS;

    // getters and setters
}