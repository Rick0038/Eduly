package com.gdsd.TutorService.controller.Admin;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Admin.BannedUserDTO;
import com.gdsd.TutorService.dto.Admin.StudentContentDTO;
import com.gdsd.TutorService.dto.Admin.TutorAdminContentDTO;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.service.interf.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {


 @Autowired
 public  AdminService adminService ;

    @Autowired
    private JwtTokenProvider tokenProvider;


    @GetMapping("/tutor-content")
    public Map<String,List<TutorAdminContentDTO>> getTutorContent(
            @RequestHeader("Authorization") String authorizationHeader) {

        String role = getRoleFromAuthHeader(authorizationHeader);
        if (!role.equalsIgnoreCase("ADMIN")) {
           throw new GenericException("USER IS UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }
        List<TutorAdminContentDTO> pendingContents = adminService.getPendingApprovalTutorContents();
        Map<String,List<TutorAdminContentDTO>> response = new HashMap<>();
        response.put("content", pendingContents);

        return new ResponseEntity<>(response, HttpStatus.OK).getBody();
    }


    @GetMapping("/student-content")
    public  Map<String,List<StudentContentDTO>> getStudentContent(
            @RequestHeader("Authorization") String authorizationHeader
    ) {


        String role = getRoleFromAuthHeader(authorizationHeader);
        if (!role.equalsIgnoreCase("ADMIN")) {
            throw new GenericException("USER IS UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }
        List<StudentContentDTO> Contents = adminService.getPendingApprovalStudentContents();
        Map<String,List<StudentContentDTO>> response = new HashMap<>();
        response.put("content", Contents);
        return new ResponseEntity<>(response, HttpStatus.OK).getBody();
    }


    @PutMapping("/content/approve/{contentId}")
    public ResponseEntity<String> approveContent(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer contentId,
     @RequestBody Map<String, String> requestBody) {

        String roleFromAuthHeader = getRoleFromAuthHeader(authorizationHeader);
        if (!roleFromAuthHeader.equalsIgnoreCase("ADMIN")) {
            throw new GenericException("USER IS UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }


        String role = requestBody.get("role");


        if ("TUTOR".equalsIgnoreCase(role) || "STUDENT".equalsIgnoreCase(role)) {
            boolean approved = adminService.approvContentById(contentId, role);
            if (approved) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.ok().build();
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid role provided");
        }
    }


    @DeleteMapping("/content/delete/{contentId}")
    public ResponseEntity<String> deleteContent(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer contentId,
            @RequestParam String role) {

        String roleFromAuthHeader = getRoleFromAuthHeader(authorizationHeader);
        if (!roleFromAuthHeader.equalsIgnoreCase("ADMIN")) {
            throw new GenericException("USER IS UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }


        if ("TUTOR".equalsIgnoreCase(role) || "STUDENT".equalsIgnoreCase(role)) {
            boolean deleted = adminService.deleteContentById(contentId, role);
            if (deleted) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.ok().build();
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid role provided");
        }
    }

    @GetMapping("/banned/users")
    public  Map<String,List<BannedUserDTO>> getBannedUsers(
            @RequestHeader("Authorization") String authorizationHeader) {

        String role = getRoleFromAuthHeader(authorizationHeader);

        if (!role.equalsIgnoreCase("ADMIN")) {
            throw new GenericException("USER IS UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }

        List<BannedUserDTO> bannedUser = adminService.getBannedUsers();
        Map<String,List<BannedUserDTO>> response = new HashMap<>();
        response.put("users", bannedUser);
        return new ResponseEntity<>(response, HttpStatus.OK).getBody();
    }




    @PutMapping("/ban/{userId}")
    public ResponseEntity<String> banTutorOrStudent(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer userId,
            @RequestBody Map<String, String> requestBody){


        String roleFromAuthHeader = getRoleFromAuthHeader(authorizationHeader);
        if (!roleFromAuthHeader.equalsIgnoreCase("ADMIN")) {
            throw new GenericException("USER IS UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }

        String role = requestBody.get("role");

        if ("TUTOR".equalsIgnoreCase(role) || "STUDENT".equalsIgnoreCase(role)) {
            boolean deleted = adminService.banTutororStudent(userId, role);
            if (deleted) {
                return ResponseEntity.ok().build();
            } else{
                return ResponseEntity.internalServerError().build();
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid role provided");
        }

    }
    @PutMapping("/unban/{userId}")
    public ResponseEntity<String> unbanTutorOrStudent(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer userId,
            @RequestBody Map<String, String> requestBody){


        String roleFromAuthHeader = getRoleFromAuthHeader(authorizationHeader);
        if (!roleFromAuthHeader.equalsIgnoreCase("ADMIN")) {
            throw new GenericException("USER IS UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
        }

        String role = requestBody.get("role");

        if ("TUTOR".equalsIgnoreCase(role) || "STUDENT".equalsIgnoreCase(role)) {
            boolean deleted = adminService.unbanTutororStudent(userId, role);
            if (deleted) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.internalServerError().build();
            }
        } else {
            return ResponseEntity.badRequest().body("Invalid role provided");
        }

    }

    public String getRoleFromAuthHeader(String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);

        String role = tokenProvider.getRoleFromToken(token);

        return role;
    }

}

