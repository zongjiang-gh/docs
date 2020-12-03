# 各种传输协议的简单了解

## 结构和网络模型

TCP/IP 模型的分法和 OSI模型之间并没有太多联系。

**TCP/IP 模型：**

- 应用层：应用层决定了向用户提供应用服务时通信的活动。提供基本的应用服务，如 FTP、DNS等。
- 传输层：传输层对上层应用层，提供处于网络连接中的两台计算机之间的数据 传输。
- 网络层：网络层用来处理在网络上流动的数据包。数据包是网络传输的最小数 据单位。该层规定了通过怎样的路径（所谓的传输路线）到达对方计 算机，并把数据包传送给对方。与对方计算机之间通过多台计算机或网络设备进行传输时，网络层所 起的作用就是在众多的选项内选择一条传输路线。
- 数据链路层：用来处理连接网络的硬件部分。包括控制操作系统、硬件的设备驱 动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等 物理可见部分（还包括连接器等一切传输媒介）。硬件上的范畴均在 链路层的作用范围之内。

**OSI 模型（从上向下为第七层-第一层）：**

- 应用层：定义了用于在网络中进行通信和数据传输的接口 - 用户程式；提供标准服务，比如虚拟终端、文件以及任务的传输和处理；
- 表示层：掩盖不同系统间的数据格式的不同性； 指定独立结构的数据传输格式； 数据的编码和解码；加密和解密；压缩和解压缩
- 会话层：管理用户会话和对话； 控制用户间逻辑连接的建立和挂断；报告上一层发生的错误
- 传输层：管理网络中端到端的信息传送； 通过错误纠正和流控制机制提供可靠且有序的数据包传送；提供面向无连接的数据包的传送；
- 网络层：定义网络设备间如何传输数据；根据唯一的网络设备地址路由数据包；提供流和拥塞控制以防止网络资源的损耗
- 数据链路层：定义操作通信连接的程序；封装数据包为数据帧；监测和纠正数据包传输错误
- 物理层：定义通过网络设备发送数据的物理方式；作为网络媒介和设备间的接口；定义光学、电气以及机械特性。

**五层模型（方便学习七层而采用）：**

- 应用层：七层模型中的应用层表示层会话层合在一起
- 传输层
- 网络层
- 数据链路层
- 物理层

## 网络协议

### TCP/IP 协议族

1. **应用层：**HTTP协议，FTP协议，SNMP协议，TELNET协议。
2. **传输层：**TCP协议，UDP协议。
3. **网络层：**IP协议，ICMP协议，ARP协议。

### DNS（Domain Name System，域名系统）

从 DNS 服务器查询域名对应的 IP 地址。

### HTTP（HyperText Transfer Protocol，超文本传输协 议)

HTTP协议是应用层协议。

### HTTP2.0

HTTP2.0使用了多路复用技术，可以在一个连接中并发处理多个请求，每个请求都有一个id。另外在HTTP1.1的基础上进行了很多优化和改进，大幅提高了性能。HTTP2.0是向下兼容的。

### FTP（File Transfer Protocol，文件传输协议）

FTP协议包括两个组成部分，其一为FTP服务器，其二为FTP客户端。其中FTP服务器用来存储文件，用户可以使用FTP客户端通过FTP协议访问位于FTP服务器上的资源。在开发网站的时候，通常利用FTP协议把网页或程序传到Web服务器上。此外，由于FTP传输效率非常高，在网络上传输大的文件时，一般也采用该协议。

### TCP（Transmission Control Protocol，传输控制协议）

TCP 又叫三次握手协议，建立TCP连接时需要经过三次握手，关闭TCP连接时需要四次握手。TCP协议是传输层协议，是面向连接的协议。

### UDP（User Data Protocol，用户数据报 协议）

UDP是传输层协议，面向数据报，不提供可靠性，没有三次握手，不保证数据到达，没有超时重发，传输速度非常快。

### IP(InternetProtocol，网络互连协议)

规定网络上计算机通信时的规则。

### WebSocket协议

WebSocket 协议是应用层协议，和socket不是一回事。层级划分上来说，WebSocket 协议和 HTTP 协议一样都是基于 TCP 协议，用来传输数据的。

WebSocket 协议依赖HTTP协议进行第一次握手，然后就直接从 TCP 通道传数据，不再需要 HTTP 协议。

基于 WebSocket 建立的连接是一种全双工的连接，连接双方没有主次关系，任何一方都可以主动向另一方发起请求，是一种真正的持久连接，这一点和 HTTP 协议的长连接或者轮询连接是不一样的。

##  连接

- HTTP 连接
- TCP 连接

### Socket 

socket的中文名字是**套接字**，是支持 TCP/IP 协议的网络通信的基本操作单元。形象的来说就是 TCP/IP 网络中建立连接的两端。

socket位于应用层和传输层之间，算是一个抽象层，是对 TCP/IP 协议的封装并抽象出了一组接口，供应用层调用。

传输层的 TCP 协议和 UDP 协议 socket 都可以用，如果一个 socket 连接基于 TCP 协议，那么建立 socket 连接的时候也需要三次握手。

**socket** **本身不是协议**，从设计模式的角度来说，socket 属于**门面模式**。就像用PID来区分系统内部的进程一样，socket可以用来区分网络上的进程。socket用以下五种信息来标识网络的进程：连接使用的协议，本机IP，本地进程的端口，远程主机IP，远程进程端口。

## 服务和接口
