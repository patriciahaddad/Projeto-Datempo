using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Controllers
{
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class OfertaController : ControllerBase
    {
        OfertaRepository _repositorio = new OfertaRepository();
        UploadRepository _uploadRepo = new UploadRepository();

        // GET: api/Oferta
        /// <summary>
        /// Pegamos as ofertas cadastradas
        /// </summary>
        /// <returns>Lista de ofertas cadastradas</returns>
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
        /// Pegamos uma oferta de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar oferta por ID</returns>
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
        /// Cadastramos uma nova oferta
        /// </summary>
        /// <param name="oferta">Passar objeto oferta</param>
        /// <returns>Cadastro de oferta</returns>
        //[Authorize(Roles = "Fornecedor")]
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post([FromForm]Oferta oferta){
            try{
                var arquivo = Request.Form.Files[0];

                oferta.Imagem = _uploadRepo.Upload(arquivo, "imgOferta");
                // Tratamos contra ataques de SQL Injection
                await _repositorio.Salvar(oferta);
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return oferta;
        }

        //Update
        /// <summary>
        /// Alteramos a oferta de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="oferta">Passar objeto oferta</param>
        /// <returns>Alterar oferta</returns>
        //[Authorize(Roles = "Fornecedor")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,[FromForm] Oferta oferta){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != oferta.IdOferta){
                return BadRequest();
            }
            try{
                var arquivo = Request.Form.Files[0];
                oferta.Imagem = _uploadRepo.Upload(arquivo, "imgOferta");
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
        /// Deletamos a oferta de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar oferta</returns>
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