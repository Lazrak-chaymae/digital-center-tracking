package com.awb.digital.center.dashboard_service.service.impl;

import com.awb.digital.center.dashboard_service.dto.ReleaseDto;
import com.awb.digital.center.dashboard_service.entity.Release;
import com.awb.digital.center.dashboard_service.exception.ResourceNotFoundException;
import com.awb.digital.center.dashboard_service.repository.ReleaseRepository;
import com.awb.digital.center.dashboard_service.service.ReleaseService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ReleaseServiceImpl implements ReleaseService {

    private ReleaseRepository repository;
    private ModelMapper mapper;

    @Override
    public ReleaseDto createRelease(ReleaseDto releaseDto) {
        Release release = mapper.map(releaseDto, Release.class);
        Release savedRelease =repository.save(release);
        return mapper.map(savedRelease, ReleaseDto.class);

    }

    @Override
    public List<ReleaseDto> getAllReleases(Integer domainId) {
        List<Release> releases = repository.findByDomainId(domainId);
        return releases.stream()
                .map((release -> mapper.map(release, ReleaseDto.class)))
                .collect(Collectors.toList());

    }

    @Override
    public ReleaseDto updateRelease(Long id, ReleaseDto releaseDto) {
        Release release = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Release not found with id:" +id));
        release.setInstallationDate(releaseDto.getInstallationDate());
        release.setVersion(releaseDto.getVersion());
        release.setType(releaseDto.getType());
        release.setPackages(releaseDto.getPackages());
        release.setHotfixContents(releaseDto.getHotfixContents());
        release.setEvolution(releaseDto.getEvolution());

        Release savedRelease = repository.save(release);
        return mapper.map(savedRelease, ReleaseDto.class);

    }

    @Override
    public void deleteRelease(Long id) {
        Release release = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Release not found with id:" +id));

        repository.delete(release);
    }

    @Override
    public void updateInstallationDate(Long id, String installationDate) {
        Release release = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Release not found with id:" +id));

        LocalDate date = LocalDate.parse(installationDate);
        release.setInstallationDate(date);
        repository.save(release);
    }

    @Override
    public void updateVersion(Long id, String version) {
        Release release = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Release not found with id:" +id));

        release.setVersion(version);
        repository.save(release);
    }

    @Override
    public void updateType(Long id, String type) {
        Release release = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Release not found with id:" +id));

        release.setType(type);
        repository.save(release);
    }

    @Override
    public void updatePackages(Long id, Integer index, String packages) {
        Release release = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Release not found with id:" +id));

        release.getPackages().set(index, packages);
        repository.save(release);
    }

    @Override
    public void updateHotfixContents(Long id, Integer index, String hotfixContent) {
        Release release = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Release not found with id:" +id));

        release.getHotfixContents().set(index, hotfixContent);
        repository.save(release);
    }

    @Override
    public void updateEvolution(Long id, String evolution) {
        Release release = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Release not found with id:" +id));

        release.setEvolution(evolution);
        repository.save(release);
    }
}
