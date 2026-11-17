package com.devflow.backend.controller;

import com.devflow.backend.dto.ProjectRequest;
import com.devflow.backend.dto.ProjectResponse;
import com.devflow.backend.entity.Project;
import com.devflow.backend.service.ProjectService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProjectResponse createProject(
            @Valid @RequestBody ProjectRequest request,
            Authentication authentication) {

        Project project = projectService.createProject(
            request.name(),
            request.description(),
            request.workspaceId(),
            authentication.getName()
        );

        return toResponse(project);
    }

    @GetMapping
    public List<ProjectResponse> getProjects(
            @RequestParam Long workspaceId,
            Authentication authentication) {

        return projectService.getWorkspaceProjects(
                workspaceId,
                authentication.getName()
            )
            .stream()
            .map(this::toResponse)
            .toList();
    }

    private ProjectResponse toResponse(Project project) {
        return new ProjectResponse(
            project.getId(),
            project.getName(),
            project.getDescription(),
            project.getWorkspace().getId(),
            project.getCreatedAt()
        );
    }
}