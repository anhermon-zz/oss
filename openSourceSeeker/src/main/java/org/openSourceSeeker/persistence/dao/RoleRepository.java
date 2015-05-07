package org.openSourceSeeker.persistence.dao;

import org.openSourceSeeker.persistence.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    public Role findByName(String name);

    public void delete(Role role);
}