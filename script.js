function openTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// GERADOR LUA
function generate() {
  const text = document.getElementById("prompt").value.toLowerCase();
  let lua = "-- Script Lua gerado automaticamente\n\n";

  if (text.includes("npc")) {
    lua += `
local npc = script.Parent
local humanoid = npc:WaitForChild("Humanoid")
local pathService = game:GetService("PathfindingService")

while true do
  wait(1)
  for _, player in pairs(game.Players:GetPlayers()) do
    if player.Character and player.Character:FindFirstChild("HumanoidRootPart") then
      local path = pathService:CreatePath()
      path:ComputeAsync(npc.PrimaryPart.Position, player.Character.HumanoidRootPart.Position)
      for _, waypoint in pairs(path:GetWaypoints()) do
        humanoid:MoveTo(waypoint.Position)
        humanoid.MoveToFinished:Wait()
      end
    end
  end
end
`;
  } else if (text.includes("gui")) {
    lua += `
local player = game.Players.LocalPlayer
local gui = Instance.new("ScreenGui", player.PlayerGui)
local frame = Instance.new("Frame", gui)
frame.Size = UDim2.new(0,300,0,200)
frame.Position = UDim2.new(0.5,-150,0.5,-100)
frame.BackgroundColor3 = Color3.fromRGB(30,30,30)
`;
  } else {
    lua += `print("Script base Roblox Lua pronto para edição")`;
  }

  document.getElementById("result").textContent = lua;
}

// COPIAR
function copyScript() {
  const text = document.getElementById("result").textContent;
  navigator.clipboard.writeText(text);
  alert("Script copiado!");
}

// CHAT ASSISTENTE
function sendMessage() {
  const input = document.getElementById("chatInput");
  const box = document.getElementById("chatBox");

  if (!input.value) return;

  box.innerHTML += `<p><b>Você:</b> ${input.value}</p>`;

  let response = "Posso ajudar com NPCs, GUI, scripts, eventos e lógica Roblox.";

  if (input.value.toLowerCase().includes("npc")) {
    response = "NPCs usam Humanoid + PathfindingService para se mover.";
  }

  box.innerHTML += `<p><b>IA:</b> ${response}</p>`;
  box.scrollTop = box.scrollHeight;
  input.value = "";
}
