//package com.gdsd.TutorService.model;
//
//import jakarta.persistence.*;
//
//@Entity
//@Table(name = "tutor_qualification_det")
//public class Qualification {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "qualificationId")
//    private Integer qualificationId;
//
//    @Column(name = "tutorId")
//    private Integer tutorId;
//
//    @Column(name = "instituteName")
//    private String instituteName;
//
//    @Column(name = "degreeName")
//    private String degreeName;
//
//    @Column(name = "degreeType")
//    private Degree degreeType;
//
//    @Column(name = "description")
//    private String description;
//
//
//    public Qualification() {
//    }
//
//    public Integer getQualificationId() {
//        return qualificationId;
//    }
//
//    public void setQualificationId(Integer qualificationId) {
//        this.qualificationId = qualificationId;
//    }
//
//    public Integer getTutorId() {
//        return tutorId;
//    }
//
//    public void setTutorId(Integer tutorId) {
//        this.tutorId = tutorId;
//    }
//
//    public String getInstituteName() {
//        return instituteName;
//    }
//
//    public void setInstituteName(String instituteName) {
//        this.instituteName = instituteName;
//    }
//
//    public String getDegreeName() {
//        return degreeName;
//    }
//
//    public void setDegreeName(String degreeName) {
//        this.degreeName = degreeName;
//    }
//
//    public Degree getDegreeType() {
//        return degreeType;
//    }
//
//    public void setDegreeType(Degree degreeType) {
//        this.degreeType = degreeType;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//
//    @Override
//    public String toString() {
//        return "Qualification{" +
//                "qualificationId=" + qualificationId +
//                ", tutorId=" + tutorId +
//                '}';
//    }
//}
