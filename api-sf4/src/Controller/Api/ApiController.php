<?php
namespace App\Controller\Api;


use App\Interfaces\DatabaseInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use App\Constante\Directories;


class ApiController extends Controller
{
    /**
     * @Route("/api/", name="api")
     * @param DatabaseInterface $database
     * @return JsonResponse
     */
    public function index(
        DatabaseInterface $database
    ): JsonResponse {
        return new JsonResponse($database->select("CALL os_get_resources('{\"roles\":[\"ROLE_ADMIN\"]}')"));
    }
    /**
     * @Route("/api/menu", name="api_meny")
     * @param DatabaseInterface $database
     * @Method({"GET"})
     * @return JsonResponse
     */
    public function menu(
        DatabaseInterface $database
    ): JsonResponse {
        $values = $database->select("CALL os_get_resources('{\"roles\":[\"ROLE_ADMIN\"]}')");    
        // Resources menu
        $menu = [];
        $menu[] = [
            'name' => 'Resources',
            'path' => '/resources',
            'icon' => 'glyphicon glyphicon-th',
            'items' => []
        ];
        foreach($values as $item) {
            $param = json_decode($item['params'], true);
            $menu[0]['items'][] = [
                'name' => $item['name'],
                'path' => $param['path'],
                'icon' => $param['icon']
            ];
        };

        return new JsonResponse($menu);
    }

    /**
     * @Route("/api/attachements/{uuid}", name="api_attachements")
     * @param DatabaseInterface $database
     * @Method({"GET"})
     * @return JsonResponse
     */
    public function retrieveImage(DatabaseInterface $database, $uuid):Response
    {
        $values = $database->select("CALL os_get_attachments('
        {
                \"roles\":[\"ROLE_ADMIN\"],
                \"uuid\":\"$uuid\",
                \"sessions\":\"1\"
        }'
            )");
          $response=new Response();
          $response->setContent($values[0]["content"]);
          $response->headers->set('Content-Type', 'image/png');
          return $response;
    }

    /**
     * @Route("/api/attachements", name="api_attachements_post")
     * @param DatabaseInterface $database
     * @Method({"POST"})
     * @return JsonResponse
     */
    public function saveImage(DatabaseInterface $database, Request $request):JsonResponse
    {
         $data = $request->getContent();
        $uploadedImage=$this->moveImage($data);
        $values = $database->select("CALL os_set_attachements('{
                \"roles\":[\"ROLE_ADMIN\"],
                \"sessions\":\"1\",
                \"user_id\":\"32\",
                \"item_id\":\"1\"
            }', :image
        )", [
            'image' => $uploadedImage
        ]);
        $data=$values[0]["uuid"];
        $message="image à été ajouter avec success";
        $response=new JsonResponse($this->success($message,$data));
        return $response; 
    }

    public function moveImage($imageBinary)
    {
        //$root=$this->getParameter('kernel.root_dir').'/../public';
        /*$timestamp = (new \DateTime())->format('Ymdhis');
        $filename = $timestamp . '_' . uniqid() . 'png';
        $directory=Directories::DIR_ATTACHEMENT;
        $dir = $root . $directory;
        if (!file_exists($dir)) {
            mkdir($dir, 0775, true);
        }
        $path = $dir . $filename;*/
        /*$file = fopen($path, 'wb');
        fwrite($file, $binary);
        fclose($file);*/
        $base64=preg_replace('/data:image\/png;base64,/', '', $imageBinary);
        $binary = base64_decode($base64);
        return $binary;

    }
     public  function success($message, $data=null)
    {
        $response["succes"]= true;
        $response["statut"]=200;
        $response["message"]=$message;
        $response["data"]=$data;
        return $response;
    }

}

 