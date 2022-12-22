using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using QLBH.Models;
using QLBH.Models.ModelLink;
using System.Net.Http.Headers;

namespace QLBH.Areas.User.Controllers
{
    public class NghesyController : Controller
    {
        [Area("user")]
        public async Task<IActionResult> Index(int id)
        {
            //id = 1;
            NgheSiViewModel pm = new NgheSiViewModel();

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:7032/api/");

                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                //Nghe Si
                HttpResponseMessage getDataNgheSi = await client.GetAsync($"NgheSi/{id}");


                if (getDataNgheSi.IsSuccessStatusCode)
                {
                    string results = getDataNgheSi.Content.ReadAsStringAsync().Result;
                    //Console.WriteLine(results);
                    pm.NgheSi = JsonConvert.DeserializeObject<NgheSi>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }


                //ALbum
                HttpResponseMessage getDataALbum = await client.GetAsync($"NgheSi/GetAlbumNgheSi/{id}");


                if (getDataALbum.IsSuccessStatusCode)
                {
                    string results = getDataALbum.Content.ReadAsStringAsync().Result;
                    //Console.WriteLine(results);
                    pm.Albums = JsonConvert.DeserializeObject<List<AlbumLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }

                //bai hat nghe si

                HttpResponseMessage getData = await client.GetAsync($"NgheSi/GetBaiHatNgheSi/{id}");


                if (getData.IsSuccessStatusCode)
                {
                    string results = getData.Content.ReadAsStringAsync().Result;
                    pm.BaiHats = JsonConvert.DeserializeObject<List<BaiHatLink>>(results);
                }
                else
                {
                    Console.WriteLine("Error calling web API");
                }
                // bai hat yeu thich
                var Usertoken = HttpContext.Session.GetString("tokenUser");
                //Console.WriteLine(userToken);
                if(Usertoken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                    HttpResponseMessage getDatabhyt = await client.GetAsync("my/BaihatUser/GetAll");


                    if (getDatabhyt.IsSuccessStatusCode)
                    {
                        string results = getDatabhyt.Content.ReadAsStringAsync().Result;
                        //Console.WriteLine(results);
                        pm.BaiHatYeuThichs = JsonConvert.DeserializeObject<List<BaiHat>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                }
                // playlist user
                if (Usertoken != null)
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Usertoken);

                    HttpResponseMessage getDataplaylist = await client.GetAsync("my/Playlist/GetAll");


                    if (getDataplaylist.IsSuccessStatusCode)
                    {
                        string results = getDataplaylist.Content.ReadAsStringAsync().Result;
                        pm.Playlists = JsonConvert.DeserializeObject<List<PlaylistLink>>(results);
                    }
                    else
                    {
                        Console.WriteLine("Error calling web API");
                    }
                }

                ViewData.Model = pm;

            }
            return View();
        }
    }
}
