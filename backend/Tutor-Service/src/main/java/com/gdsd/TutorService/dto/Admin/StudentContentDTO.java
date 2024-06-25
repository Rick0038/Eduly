package com.gdsd.TutorService.dto.Admin;

public class StudentContentDTO {

    private Integer contentId;
    private Integer studentId;
    private String type;
    private String link;

    private  String studentName;
    private String status;
   // private String uploadTimestamp;

    public StudentContentDTO() {
    }

//    public StudentContentDTO(Integer contentId, Integer studentId, String type, String link, String status, String uploadTimestamp) {
//        this.contentId = contentId;
//        this.studentId = studentId;
//        this.type = type;
//        this.link = link;
//        this.status = status;
//        this.uploadTimestamp = uploadTimestamp;
//    }
public StudentContentDTO(Integer contentId, Integer studentId, String type, String link,String studentName, String status) {
        this.contentId = contentId;
        this.studentId = studentId;
        this.type = type;
        this.link = link;
        this.studentName=studentName;
        this.status = status;
    }
    public Integer getContentId() {
        return contentId;
    }

    public void setContentId(Integer contentId) {
        this.contentId = contentId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

//    public String getUploadTimestamp() {
//        return uploadTimestamp;
//    }
//
//    public void setUploadTimestamp(String uploadTimestamp) {
//        this.uploadTimestamp = uploadTimestamp;
//    }
}
