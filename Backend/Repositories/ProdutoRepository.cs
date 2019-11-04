using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class ProdutoRepository : IProduto
    {
        public async Task<Produto> Alterar(Produto produto)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                //Comparamos os atributos que foram modificados através do EF
                _contexto.Entry(produto).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
                return produto;
            }
        }

        public async Task<Produto> BuscarPorID(int id)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Produto.Include("IdCategoriaNavigation").FirstOrDefaultAsync(p => p.IdProduto == id);
            }
        }

        public async Task<Produto> Excluir(Produto produto)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                _contexto.Produto.Remove(produto);
                await _contexto.SaveChangesAsync();
                return produto;
            }
        }

        public async Task<List<Produto>> Listar()
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Produto.Include("IdCategoriaNavigation").ToListAsync();
            }
        }

        public async Task<Produto> Salvar(Produto produto)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(produto);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync();
                return produto;
            }
        }
    }
}