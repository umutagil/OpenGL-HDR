#version 330 core
out vec4 color;

in VS_OUT {
	vec3 Normal;
	vec3 FragPos;
	vec2 TexCoords;
} fs_in;

  
struct Light {
	vec3 Position;
	vec3 Color;
};

uniform Light lights[16]; 
uniform sampler2D diffuseTexture;
uniform vec3 viewPos;

void main()
{

	vec3 diffColor = texture(diffuseTexture, fs_in.TexCoords).rgb;
	vec3 normal = normalize(fs_in.Normal);

    // Ambient
    float ambientStrength = 0.0f;
    vec3 ambient = ambientStrength * diffColor;
	
	vec3 lighting = vec3(0.0f);
	for(int lightIndex = 0; lightIndex < 16; lightIndex++)
	{
		// Diffuse
		vec3 lightDir = normalize(lights[lightIndex].Position - fs_in.FragPos);
		float diff = max(dot(normal, lightDir), 0.0);
		vec3 diffuse = diff * lights[lightIndex].Color * diffColor;
		vec3 resDiffuse = diffuse;

		// Attenuation
		float distance = length(lights[lightIndex].Position - fs_in.FragPos);
		resDiffuse *= 1.0 / (distance * distance);
		lighting += resDiffuse;
	}
                       
    color = vec4(ambient + lighting, 1.0f);
} 