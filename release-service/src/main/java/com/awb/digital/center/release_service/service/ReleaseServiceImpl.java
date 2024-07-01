package com.awb.digital.center.release_service.service;

import com.awb.digital.center.release_service.dto.ReleaseDto;
import com.awb.digital.center.release_service.entity.Release;
import com.awb.digital.center.release_service.exception.ResourceNotFoundException;
import com.awb.digital.center.release_service.repository.ReleaseRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

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
    public List<ReleaseDto> getAllRelease() {
        List<Release> releases = repository.findAll();
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
}
