package com.gdsd.TutorService.dto.Student;

public class UpcomingAppointmentDto {

    private String date;
    private Integer sessionId;
    private String from;
    private String to;
    private String status;
    private TutorDetailDto tutorDetail;
    public static class TutorDetailDto{
        private Integer id;
        private String name;
        private String profileImgLink;
        private String bbbLink;

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getProfileImgLink() {
            return profileImgLink;
        }

        public void setProfileImgLink(String profileImgLink) {
            this.profileImgLink = profileImgLink;
        }

        public String getBbbLink() {
            return bbbLink;
        }

        public void setBbbLink(String bbbLink) {
            this.bbbLink = bbbLink;
        }
    }
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Integer getSessionId() {
        return sessionId;
    }

    public void setSessionId(Integer sessionId) {
        this.sessionId = sessionId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public TutorDetailDto getTutorDetail() {
        return tutorDetail;
    }
    public void setTutorDetail(TutorDetailDto tutorDetails){
        this.tutorDetail =tutorDetails;
    }
}
