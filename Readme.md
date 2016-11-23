# ld-web-layer

The `ld-web-layer` application should be able to render resources, be configurable and enable caching.

## Notes

I probably made a fundamental mistake: I assumed that the custom product will be loaded into the `ld-web-layer` but this
is a mistake, since it creates an unwanted coupling between the web-layer itself and the final, custom website.
 
Instead, one should use the `ld-web-layer` as a mounted application within the custom website and allow forwarding to the
generic `ld-web-layer`.

## Tasks

    - Fetch data from api and render them is easy, as well as inserting the corresponding content and metadata. Nevertheless
    It is a problem to have a fixed, routed endpoint for the api, because it prevents you from composing multiple entities
    into a single template.
    - **Custom templates and layouts** can be solved by injecting the name of the layout into the request, and taking them
     Into account when the page is rendered. To pass the data to the rendering I'd propose to preserve a context on the request.
     - **Speaking urls** are also a just a matter of routing, but get hard to handle if they should be injected by the custom website
     - It might be a good idea to define a format for rewriting the urls, so its a matter of configuration instead of "coding"
    