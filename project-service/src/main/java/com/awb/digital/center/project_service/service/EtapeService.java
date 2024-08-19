package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.EtapeDto;
import java.util.List;


public interface EtapeService {

       List<EtapeDto> getAllEtapes(Integer domainId);
       EtapeDto  addEtape(EtapeDto etapeDto);
       EtapeDto  updateEtape(EtapeDto etapeDto, Long id);
       void deleteEtape(Long id);
       void updateEtapeName(Long id, String name);
}
