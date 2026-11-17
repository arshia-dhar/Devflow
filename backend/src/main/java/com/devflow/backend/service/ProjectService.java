package com.devflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devflow.backend.entity.Project;
import com.devflow.backend.entity.User;
import com.devflow.backend.entity.Workspace;
import com.devflow.backend.repository.ProjectRepository;
import com.devflow.backend.repository.UserRepository;
import com.devflow.backend.repository.WorkspaceRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;

    public ProjectService(
            ProjectRepository projectRepository,
            WorkspaceRepository workspaceRepository,
            UserRepository userRepository) {

        this.projectRepository = projectRepository;
        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(
            String name,
            String description,
            Long workspaceId,
            String email) {

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Workspace workspace = workspaceRepository.findById(workspaceId)
            .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));

        if (!workspace.getOwner().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You do not own this workspace");
        }

        Project project = new Project();
        project.setName(name);
        project.setDescription(description);
        project.setWorkspace(workspace);

        return projectRepository.save(project);
    }

    public List<Project> getWorkspaceProjects(
            Long workspaceId,
            String email) {

        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Workspace workspace = workspaceRepository.findById(workspaceId)
            .orElseThrow(() -> new IllegalArgumentException("Workspace not found"));

        if (!workspace.getOwner().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You do not own this workspace");
        }

        return projectRepository.findByWorkspaceId(workspaceId);
    }
}