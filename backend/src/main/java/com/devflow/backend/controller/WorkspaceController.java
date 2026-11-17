
package com.devflow.backend.controller;

import com.devflow.backend.dto.WorkspaceRequest;
import com.devflow.backend.dto.WorkspaceResponse;
import com.devflow.backend.entity.Workspace;
import com.devflow.backend.service.WorkspaceService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/workspaces")
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkspaceResponse createWorkspace(
            @Valid @RequestBody WorkspaceRequest request,
            Authentication authentication) {

        Workspace workspace = workspaceService.createWorkspace(
            request.name(),
            request.description(),
            authentication.getName()
        );

        return toResponse(workspace);
    }

    @GetMapping
    public List<WorkspaceResponse> getWorkspaces(
            Authentication authentication) {

        return workspaceService.getUserWorkspaces(authentication.getName())
            .stream()
            .map(this::toResponse)
            .toList();
    }

    private WorkspaceResponse toResponse(Workspace workspace) {
        return new WorkspaceResponse(
            workspace.getId(),
            workspace.getName(),
            workspace.getDescription(),
            workspace.getCreatedAt()
        );
    }
}
