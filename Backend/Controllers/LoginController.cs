using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Backend.Domains;
using Backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase {
        // Chamamos nosso contexto da base de dados
        bddatempoContext _context = new bddatempoContext ();

        // Definimos uma variável para percorrer nossos métodos com as configurações obtidas no appsettings.json
        private IConfiguration _config;

        // Definimos um método construtor para poder acessar estas configs
        public LoginController (IConfiguration config) {
            _config = config;
        }

        /// <summary>
        /// Chamamos nosso método para validar o usuário na aplicação
        /// </summary>
        /// <param name="login">Passar objeto login</param>
        /// <returns>Validar usuário</returns>
        private Usuario ValidaUsuario (LoginViewModel login) {
            var usuario = _context.Usuario.Include ("IdTipoUsuarioNavigation").FirstOrDefault (
                u => u.Email == login.Email && u.Senha == login.Senha
            );
            return usuario;
        }

        /// <summary>
        /// Geramos o Token
        /// </summary>
        /// <param name="userInfo">Passar objeto userinfo</param>
        /// <returns>Gerar Token</returns>
        private string GerarToken (Usuario userInfo) {
            // Definimos a criptografia do nosso Token
            var securityKey = new SymmetricSecurityKey (Encoding.UTF8.GetBytes (_config["Jwt:Key"]));

            var credentials = new SigningCredentials (securityKey, SecurityAlgorithms.HmacSha256);

            // Definimos nossas Claims(dados da sessão)
            var claims = new [] {
                new Claim (JwtRegisteredClaimNames.NameId, userInfo.Nome),
                new Claim (JwtRegisteredClaimNames.Email, userInfo.Email),
                new Claim (ClaimTypes.Role, userInfo.IdTipoUsuarioNavigation.Titulo.ToString ()),
                new Claim ("Role", userInfo.IdTipoUsuarioNavigation.Titulo.ToString ()),
                new Claim (JwtRegisteredClaimNames.Jti, Guid.NewGuid ().ToString ()),
                new Claim ("id", userInfo.IdUsuario.ToString())
            };

            //Configuramos nosso Token e seu tempo de vida
            var token = new JwtSecurityToken (
                _config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires : DateTime.Now.AddMinutes (120),
                signingCredentials : credentials
            );
            return new JwtSecurityTokenHandler ().WriteToken (token);
        }

        // Usamos essa anotação para ignorar a autenticação nesse método
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login ([FromBody] LoginViewModel login) {

            IActionResult response = Unauthorized ();
            var user = ValidaUsuario (login);

            if (user != null) {
                var tokenString = GerarToken (user);
                response = Ok (new { token = tokenString });
            }
            return response;
        }
    }
}