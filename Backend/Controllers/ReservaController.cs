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
        /// Lista todos reservas salvas
        /// </summary>
        /// <returns>Reservas salvas</returns>
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
        /// Lista as reservas por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <returns>Reservas solicitadas</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Reserva>> Get(int id)
        {
            var reserva = await _repositorio.BuscarPorID(id);

            if(reserva == null){
                return NotFound();
            }

            return reserva;
        }

        //
        //POST api/Reserva
        /// <summary>
        /// Lista todos reservas salvos
        /// </summary>
        /// <param name="reserva">string reserva</param>
        /// <returns>reservas salvas</returns>
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
        /// Altera reserva por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <param name="reserva">string reserva</param>
        /// <returns></returns>
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
        /// Deleta reserva por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <returns>Mensagem de exclusão de reserva</returns>
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