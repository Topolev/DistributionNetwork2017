package com.distributionnetwork.app.service.util;

public class ServiceException extends Exception {

    private String entityName;
    private String errorKey;
    private String defaultMessage;

    public ServiceException(String entityName, String errorKey, String defaultMessage) {
        this.entityName = entityName;
        this.errorKey = errorKey;
        this.defaultMessage = defaultMessage;
    }

    public String getEntityName() {
        return entityName;
    }

    public String getErrorKey() {
        return errorKey;
    }

    public String getDefaultMessage() {
        return defaultMessage;
    }
}
