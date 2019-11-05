using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        //bddatempoContext _repositorio = new bddatempoContext();
        ReservaRepository _repositorio = new ReservaRepository();

        // GET: api/Reserva
        /// <summary>
        /// Pegamos as reservas cadastradas
        /// </summary>
        /// <returns>Lista de reservas cadastradas</returns>
        [HttpGet]
        public async Task<ActionResult<List<Reserva>>> Get()
        {
            var reservas = await _repositorio.Listar();

            if(reservas == null){
                return NotFound();
            }

            return reservas;
        }

        // GET: api/Reserva/2
        /// <summary>
        /// Pegamos uma reserva de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar reserva por ID</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Reserva>> Get(int id)
        {
            var reserva = await _repositorio.BuscarPorID(id);

            if(reserva == null){
                return NotFound();
            }

            return reserva;
        }

        //POST api/Reserva
        /// <summary>
        /// Cadastramos uma nova reserva
        /// </summary>
        /// <param name="reserva">Passar objeto reserva</param>
        /// <returns>Cadastro de reserva</returns>
        [HttpPost]
        public async Task<ActionResult<Reserva>> Post(Reserva reserva){
            try{
                await _repositorio.Salvar(reserva);
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return reserva;
        }

        //Update
        /// <summary>
        /// Alteramos uma reserva de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="reserva">Passar objeto reserva</param>
        /// <returns>Alterar reserva</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Reserva reserva){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != reserva.IdReserva){
                return BadRequest();
            }
            try{
                await _repositorio.Alterar(reserva);
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var reserva_valido = await _repositorio.BuscarPorID(id);

                if(reserva_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/reserva/id
        /// <summary>
        /// Deletamos uma reserva de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar reserva</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Reserva>> Delete(int id){
            var reserva = await _repositorio.BuscarPorID(id);
            if(reserva == null){
                return NotFound();
            }
            await _repositorio.Excluir(reserva);

            return reserva;
        }
    }
}