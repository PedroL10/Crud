package br.com.pedro.projeto.service;

import br.com.pedro.projeto.dto.UsuarioDTO;
import br.com.pedro.projeto.entity.UsuarioEntity;
import br.com.pedro.projeto.entity.UsuarioVerificadorEntity;
import br.com.pedro.projeto.entity.enums.TipoSituacaoUsuario;
import br.com.pedro.projeto.repository.UsuarioVerificadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import br.com.pedro.projeto.repository.UsuarioRepository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class UsuarioService {

    @Autowired
    public UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UsuarioVerificadorRepository usuarioVerificadorRepository;

    public List<UsuarioDTO> listarTodos(){
        List<UsuarioEntity> usuarios = usuarioRepository.findAll();
        return usuarios.stream().map(UsuarioDTO::new).toList();
    }

    public UsuarioDTO listarPorId(Long id){
        UsuarioEntity usuarioEntity = usuarioRepository.findById(id).orElseThrow();
        return new UsuarioDTO(usuarioEntity);
    }

    public void inserir(UsuarioDTO usuarioDTO){
        UsuarioEntity usuarioEntity = new UsuarioEntity(usuarioDTO);
        usuarioEntity.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));
        usuarioRepository.save(usuarioEntity);
    }

    public UsuarioDTO alterar(UsuarioDTO usuarioDTO){
        UsuarioEntity usuarioEntity = new UsuarioEntity(usuarioDTO);
        usuarioEntity.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));
        return new UsuarioDTO(usuarioRepository.save(usuarioEntity));
    }
    public void deletar(Long id){
        UsuarioEntity usuarioEntity = usuarioRepository.findById(id).orElseThrow();
        usuarioRepository.deleteById(id);
    }

    public void inserirNovoUsuario(UsuarioDTO usuario) {
        UsuarioEntity usuarioEntity = new UsuarioEntity(usuario);
        usuarioEntity.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioEntity.setSituacao(TipoSituacaoUsuario.PENDENTE);
        usuarioEntity.setId(null);
        usuarioRepository.save(usuarioEntity);

        UsuarioVerificadorEntity verificador = new UsuarioVerificadorEntity();
        verificador.setUsuario(usuarioEntity);
        verificador.setUuid(UUID.randomUUID());
        verificador.setDataExpiracao(Instant.now().plusMillis(900000));
        usuarioVerificadorRepository.save(verificador);

        //TODO - Enviar um email para verificar a conta
        emailService.enviarEmailTexto(usuario.getEmail(),
                "Novo usuário cadastrado",
                "Você está recebendo um email de cadastro o número para validação é " + verificador.getUuid());

    }

    public String verificarCadastro(String uuid) {

        UsuarioVerificadorEntity usuarioVerificacao = usuarioVerificadorRepository.findByUuid(UUID.fromString(uuid)).get();

        if(usuarioVerificacao != null) {
            if(usuarioVerificacao.getDataExpiracao().compareTo(Instant.now()) >= 0) {

                UsuarioEntity u = usuarioVerificacao.getUsuario();
                u.setSituacao(TipoSituacaoUsuario.ATIVO);

                usuarioRepository.save(u);

                return "Usuário Verificado";
            }else {
                usuarioVerificadorRepository.delete(usuarioVerificacao);
                return "Tempo de verificação expirado";
            }
        }else {
            return "Usuario não verificado";
        }

    }

}
