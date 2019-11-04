using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace upload_dotnet.Controllers {

        [Route ("api/[controller]")]
        [ApiController]
        public class UploadController : ControllerBase {
            
            [HttpPost, DisableRequestSizeLimit]
            //IActionResult
            public string Upload () {

                    var file = Request.Form.Files[0];
                    var folderName = Path.Combine ("imagens");
                    var pathToSave = Path.Combine (Directory.GetCurrentDirectory (), folderName);

                    if (file.Length > 0) {
                        var fileName = ContentDispositionHeaderValue.Parse (file.ContentDisposition).FileName.Trim ('"');
                        var fullPath = Path.Combine (pathToSave, fileName);
                        var dbPath = Path.Combine (folderName, fileName);

                        using (var stream = new FileStream (fullPath, FileMode.Create)) {
                            file.CopyTo (stream);
                        }

                        return fileName;
                        // return Ok (new { fileName });
                    } else {
                        return "";
                    }
                }

            }
        }