using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using upload_dotnet.Controllers;

namespace backend.Controllers
{
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class OfertaController : ControllerBase
    {
        OfertaRepository _repositorio = new OfertaRepository();
        UploadController _upload = new UploadController();

        // GET: api/Oferta
        /// <summary>
        /// Lista todos ofertas salvas
        /// </summary>
        /// <returns>Oferta salvas</returns>
        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> Get()
        {
            var ofertas = await _repositorio.Listar();

            if(ofertas == null){
                return NotFound();
            }

            return ofertas;
        }
        // GET: api/Oferta/2
        /// <summary>
        /// Lista as ofertas por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <returns>ofertas solicitadas</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Oferta>> Get(int id)
        {
            var oferta = await _repositorio.BuscarPorID(id);

            if(oferta == null){
                return NotFound();
            }

            return oferta;
        }

        //POST api/Oferta
        /// <summary>
        /// Lista todos ofertas salvos
        /// </summary>
        /// <param name="oferta"></param>
        /// <returns>ofertas salvas</returns>
        [Authorize(Roles = "Fornecedor")]
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post([FromForm]Oferta oferta){
            try{
                oferta.Imagem=_upload.Upload();
                // Tratamos contra ataques de SQL Injection
                await _repositorio.Salvar(oferta);
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return oferta;
        }

        //Update
        /// <summary>
        /// Altera oferta por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <param name="oferta">string oferta</param>
        /// <returns></returns>
        [Authorize(Roles = "Fornecedor")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Oferta oferta){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != oferta.IdOferta){
                return BadRequest();
            }
            try{
                await _repositorio.Alterar(oferta);
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var oferta_valido = await _repositorio.BuscarPorID(id);

                if(oferta_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/oferta/id
        /// <summary>
        /// Deleta oferta por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <returns>Mensagem de exclusão de oferta</returns>
        [Authorize(Roles = "Fornecedor")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Oferta>> Delete(int id){
            var oferta = await _repositorio.BuscarPorID(id);
            if(oferta == null){
                return NotFound();
            }
            await _repositorio.Excluir(oferta);

            return oferta;
        }
    }
}