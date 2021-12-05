; asm -f elf64 main.asm
; ld  -dynamic-linker /lib/ld-linux-x86-64.so.2 main.o -lc
extern printf
section .data
file: db "../input", 0
len equ 9574
fmt: db "%d", 0x0a, 0
section .bss
input: resb 16

section .text
global _start

_start:
mov rax, 2;open
mov rdi, file
mov rsi, 0
mov rdx, 0
syscall

push rax
sub rsp, len

mov rax, 0;read
mov rdi, [rsp + len]
mov rsi, rsp
mov rdx, len
syscall

mov byte [rsi + len], 0


xor r8, r8
xor r9, r9
xor r10, r10
mov r13, 150
xor r12, r12
whilenotcrlf:
cmp byte [rsi], 0x0a
je foundcrlf

;convert to int
mov rax, 0xA
mul r8
mov r8, rax
mov r9b, [rsi]
sub r9, 0x30
add r8, r9

inc rsi
;if EOF QUIT
cmp byte [rsi], 0
je exit
jmp whilenotcrlf

foundcrlf:
mov r10, r8
xor r8, r8
cmp r10, r13
jg greater
jmp endcompare

greater:
inc r12

endcompare:
mov r13, r10
inc rsi
jmp whilenotcrlf


exit:
mov rdi, fmt
mov rsi, r12
call printf

mov rax, 60
mov rdi, 0
syscall
