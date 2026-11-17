
package com.devflow.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;

public record ProjectRequest(
    @NotBlank
    @Size(max = 100)
    String name,

    @Size(max = 500)
    String description,

    @NotNull
    Long workspaceId
) {}
