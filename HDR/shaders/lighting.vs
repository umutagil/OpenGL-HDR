#version 330 core
layout (location = 0) in vec3 position;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec2 texCoords;

out VS_OUT
{
	vec3 Normal;
	vec3 FragPos;
	vec2 TexCoords;
} vs_out;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform bool inverse_normals;

void main()
{
    gl_Position = projection * view *  model * vec4(position, 1.0f);
    vs_out.FragPos = vec3(model * vec4(position, 1.0f));
    vs_out.TexCoords = texCoords;

	vec3 normal_adj = inverse_normals ? -normal : normal;	
	mat3 normalMatrix = transpose(inverse(mat3(model))); 
	vs_out.Normal = normalize(normalMatrix * normal_adj);
} 