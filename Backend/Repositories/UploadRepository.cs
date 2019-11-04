using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Repositories
{
    public class UploadRepository : ControllerBase
    {
        public string Upload (IFormFile arquivo, string savingFolder) {
               
            if(savingFolder == null) {
                savingFolder = Path.Combine ("imagens");                
            }

            var pathToSave = Path.Combine (Directory.GetCurrentDirectory (), savingFolder);

            if (arquivo.Length > 0) {
                var fileName = ContentDispositionHeaderValue.Parse (arquivo.ContentDisposition).FileName.Trim ('"');
                var fullPath = Path.Combine (pathToSave, fileName);

                using (var stream = new FileStream (fullPath, FileMode.Create)) {
                    arquivo.CopyTo (stream);
                }                    

                return fileName;
            } else {
                return null;
            }           
        }
    }
}