
package com.devflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devflow.backend.entity.User;
import com.devflow.backend.entity.Workspace;
import com.devflow.backend.repository.UserRepository;
import com.devflow.backend.repository.WorkspaceRepository;

@Service
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;
    private final UserRepository userRepository;

    public WorkspaceService(
            WorkspaceRepository workspaceRepository,
            UserRepository userRepository) {
        this.workspaceRepository = workspaceRepository;
        this.userRepository = userRepository;
    }

    public Workspace createWorkspace(
            String name,
            String description,
            String email) {

        User owner = userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Workspace workspace = new Workspace();
        workspace.setName(name);
        workspace.setDescription(description);
        workspace.setOwner(owner);

        return workspaceRepository.save(workspace);
    }

    public List<Workspace> getUserWorkspaces(String email) {

        User owner = userRepository.findByEmail(email)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return workspaceRepository.findByOwnerId(owner.getId());
    }
}
