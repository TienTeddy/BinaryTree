using ActionsTree;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TreeAVL.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Sort()
        {
            return RedirectToAction("~lesion1/index.html");
        }

        public ActionResult Tree()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult AVLTree(int[] data)
        {
            //int[] a = { 8,1,3,9,6,7,2,22,10,11 };
            //int[] data = { 4, 6, 1, 5, 7, 9, 9, 9 };
            //data = null;
            
            var dao = new AVLTree();
            var result = dao.show(data, data.Length);
            data = null;
            return Json(result, JsonRequestBehavior.AllowGet);
        }


    }
}