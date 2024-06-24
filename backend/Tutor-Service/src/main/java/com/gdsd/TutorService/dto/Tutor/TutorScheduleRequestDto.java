package com.gdsd.TutorService.dto.Tutor;

public class TutorScheduleRequestDto {
    private String date;
    private String from;
    private String to;

    public TutorScheduleRequestDto() {
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }
}
