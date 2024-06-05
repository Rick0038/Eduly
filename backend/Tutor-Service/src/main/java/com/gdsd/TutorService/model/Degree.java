package com.gdsd.TutorService.model;

public enum Degree {

    NO_FORMAL_DEGREE("No Formal Degree"),
    HIGH_SCHOOL_DIPLOMA("High School Diploma"),
    BACHELORS("Bachelors"),
    MASTERS("Masters"),
    DOCTORATE("Doctorate");

    private final String displayName;

    Degree(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}

