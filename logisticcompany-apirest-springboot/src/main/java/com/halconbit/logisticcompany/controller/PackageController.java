package com.halconbit.logisticcompany.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequestMapping("/packages")
public class PackageController {
    private final PackageRepository packageRepository;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final PackageService packageService;

    @Autowired
    public PackageController(PackageRepository packageRepository, UserRepository userRepository,
                             AuthService authService, PackageService packageService) {
        this.packageRepository = packageRepository;
        this.userRepository = userRepository;
        this.authService = authService;
        this.packageService = packageService;
    }

    @GetMapping
    public List<Package> getPackages() {
        return packageRepository.findAll();
    }

    @PostMapping
    public Package createPackage(@RequestBody Package newPackage, @RequestHeader("Authorization") String token)
            throws Exception {
        User owner = authService.parseToken(token.substring(7)).get("id", User.class); // eliminar el prefijo "Bearer "
        newPackage.setOwner(owner.getId());
        return packageRepository.save(newPackage);
    }

    @GetMapping("/{packageId}")
    public Package getPackage(@PathVariable String packageId) {
        return packageRepository.findById(packageId).orElse(null);
    }

    @PutMapping("/{packageId}")
    public Package updatePackage(@PathVariable String packageId, @RequestBody Package updatedPackage,
                                 @RequestHeader("Authorization") String token) throws Exception {
        User owner = authService.parseToken(token.substring(7)).get("id", User.class); // eliminar el prefijo "Bearer "
        Package packageToUpdate = packageRepository.findById(packageId).orElse(null);
        if (packageToUpdate == null) {
            return null;
        }

        if (!packageToUpdate.getOwner().equals(owner.getId())) {
            throw new Exception("No tienes permiso para editar este paquete");
        }

        updatedPackage.setId(packageToUpdate.getId());
        updatedPackage.setOwner(packageToUpdate.getOwner());
        return packageRepository.save(updatedPackage);
    }

    @DeleteMapping("/{packageId}")
    public void deletePackage(@PathVariable String packageId, @RequestHeader("Authorization") String token)
            throws Exception {
        User owner = authService.parseToken(token.substring(7)).get("id", User.class); // eliminar el prefijo "Bearer "
        Package packageToDelete = packageRepository.findById(packageId).orElse(null);
        if (packageToDelete == null) {
            return; // retorna sin acción si no se encuentra el paquete
        }

        if (!packageToDelete.getOwner().equals(owner.getId())) {
            throw new Exception("No tienes permiso para eliminar este paquete");
        }

        packageRepository.delete(packageToDelete);

        String subject = "Eliminación de Paquete";
        String text = "Su paquete con número de seguimiento " + packageToDelete.getTrackingNumber() +
                " ha sido eliminado del sistema.";
        packageService.sendNotificationEmail(owner.getEmail(), subject, text);
    }
}