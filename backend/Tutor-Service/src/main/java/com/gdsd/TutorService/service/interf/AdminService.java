package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Admin.BannedUserDTO;
import com.gdsd.TutorService.dto.Admin.StudentContentDTO;
import com.gdsd.TutorService.dto.Admin.TutorAdminContentDTO;

import java.util.List;

public interface AdminService {
     List<TutorAdminContentDTO> getPendingApprovalTutorContents();
     List<StudentContentDTO> getPendingApprovalStudentContents();
     boolean approvContentById(Integer contentId, String role);

     boolean deleteContentById(Integer contentId, String role);

     List<BannedUserDTO> getBannedUsers();

     boolean banTutororStudent(Integer id, String role);
      Integer getAdminIdFromEmail(String email) ;
     String getAdminNameFromId(Integer id) ;
     boolean unbanTutororStudent(Integer id, String role);
}
