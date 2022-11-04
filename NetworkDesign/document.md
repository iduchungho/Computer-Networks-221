# ASSIGNMENT 2
#### Course: Computer Network, Semester 1, 2022-2023
Note: 
✔	The assignments are mandatory. 
✔	Students who do not complete any major assignments will be banned. 
## Background (assumed)
In order to build a modern, friendly and energy-saving University, HCMC University of Technology delivered to the Faculty of Computer Science and Engineering the research and deployment of a system monitoring activities of students in the buildings and including measurement devices such as temperature, humidity, and light in the classrooms in order to reduce energy costs. The system was piloted in the building H6 of the campus 2. For improving the quality of the service of the system operation, the Faculty needs new design and deployment of the network in this building. The group of students studying computer networks courses are invited to counsel and offer solutions to the appropriate requirements of the current building.
Detailed description
Note: 
-	Some information in the description below are estimates. Some anonymous assumptions not exist in reality but are included in 
-	the requirements to match the target of an assignment. When deployed, the group can also make assumptions necessary to complete your design ideas.
-	Encourage groups to get actual data from building H6.
In campus 2, H6 building will implement a system of surveillance cameras at some point and the camera's data will be stored centrally in a server room 106 H6. There are also computer rooms on floors 6 and 7.
To cater for monitoring, the University will invest in every classroom in the building H6 IoT devices include: 6 temperature sensors, 6 light sensors for large theory rooms ( an area larger than 60 m2), the light control equipment; 3 temperature sensors, 3 light sensors for the remaining rooms (the smaller area of 60 m2), light control equipment. At each operating spread in each floor will be fitted 4 surveillance cameras. The classrooms will be equipped with desktop computers. In practice, the computer room will be fitted with air conditioner equipment control. The measurement device will collect data continuously every 1 minute in real time and send it to the processing server every 5 minutes.
Description of data: A sensor will measure a different index but their data format size is 32 Kb. Sensors will collect data one-minute once and after 5 minutes they send this data to the central server over the WIFI network. The operation system of 24/7 surveillance cameras will store the data directly to a central server with a data transfer rate of 100 Mbps. The computers in the classrooms will download about 200MB per day (peak hours are 7:00 to 17:30). Each device when connected to the WIFI network is used with 256 Kbps maximum speed in terms of time 7h30 to 17h30.
Also, the building H6 has an administrative office with 10 computers. The computers download about 200MB per day (peak hours are 8:00 am to 11:40 pm, 13h to 16h30) and send 10 emails per day with a maximum capacity of 10 MB per email.
In addition, each floor is the VLAN config and the system can connect to H6.
Request
The Consultants will provide specific designs that the construction people can rely on it to implement the building H6. To convince the investors to choose their solutions, the consultants should also analyze the data in order to demonstrate the reasonableness of solutions. Specifically:
-	Network architecture of the system in the building H6 and the IP settings for this network.
-	Based on the architecture above, calculate the division of subnets for each target device or divided by departments.
-	Capacity needed to ensure the system operates efficiently
-	The system of switches, routers and cost estimates
-	Line speed internet connections
Requirements for talent group: Configure and run the simulation for a part of the computer network designed on real devices in the lab. 
Deliverables
-	Deliverables must be submitted:
-	Notes to the computer network design described in section 2, 3 includes:
    -	Analyze system requirements
    -	Calculate storage capacity, network traffic 
    -	Physical design
    -	Logical Diagram
    -	The equipment list used
    -	The total expected cost
    -	Analyze the advantages and disadvantages
-	Simulation program on packet tracer
 
Submission deadline
-	Filed directly with the lecturers during the report in class.
-	Softcopy version: submit through the e-learning system, before 23:00 on December 01, 2022.
Marking time
-	The Lab monitors (TA) will announce.

 
### Appendix: Assignment guidelines
1. Requirements Background
Due to global warming and many environmental problems these days, HCM University of Technology wants to rebuild the campus into a modern, friendly and energy-saving place for all the students and tutors. To achieve that purpose, a system monitoring activity of students in buildings needs to be built and in addition, in each classroom, measurement devices such as temperature, humidity, and light sensors also need to be implemented to calculate the energy usage in order to adjust the device and reduce the cost. To start deploying this project, HCMUT decided to build the system in the building H6 of the campus 2. However, in order to make the operation of the system work better, the network design of the current building H6 need to be rework with a new design to utilize the features of new system and therefore, group  of  students  studying  computer  networks  course  are  invited  to  counsel  to  offer  appropriate solutions with the minimum cost for the current building H6. Now, before getting into the requirements, our team need to note that:
•	To make the design more practical and suitable for real life purposes, much information had been confirmed by the computer network tutor and moreover, our own team had also added some trivial details in order to make the assignment logically work in real life.
•	Actual data of this assignment is gathered from the actual tutor’s knowledge about building H6 and our own research for devices, materials which were used to build the network design.
•	We use packet tracer version 7.3.0 to make the logical, physical demo view.
2. The Detailed Description
⮚	Analyze the first requirement: “In campus 2, H6 building will implement a system of surveillance cameras at some point and the camera's data will be stored centrally in a server room 106 H6. There are also computer rooms on floors 6 and 7.”
✔	This requirement only tells us there will be a system of surveillance cameras but not going into details how they operate and what their capacity. Therefore, we will only focus on one important detail and that is the camera’s data. Those data are said to be stored centrally in a server room in 106 H6, which means in network design, our team must design a server room in floor 1 and it can connect to camera IP Address to get the record and store it on the server. Moreover, computer rooms on floors 6 and 7 may connect to the camera system but the requirements in this part still do not clarify it yet. 
⮚	Analyze the second requirement: “6 temperature sensors, 6 light sensors for large theory rooms (an area larger than 60 m2), the light control equipment; 3 temperature sensors, 3 light sensors for the remaining rooms (the smaller area of 60 m2), light control equipment.  At each operating spread in each floor will be fitted 4 surveillance cameras.”
✔	This requirement simply gives us the detail about the number of different types of sensors in each room (which tell us there will be multiple kinds of room to be considered when designing the network path). However, the requirement does not tell us how they connect to the network and how it works with the light control equipment, which we also need the later part to explain clearly. Next, now we know that the camera system will include 4 surveillance cameras on each floor and from there, our team must also consider implementing the network path for them.
⮚	Analyze the third requirement: “In the classrooms will be equipped with desktop computers. In practice, the computer room will be fitted with air conditioner equipment control. The measurement device will collect data continuously every 1 minute in real time and send it to the processing server every 5 minutes.”
✔	The third requirement tells us about computer rooms which contain an air conditioner equipment control. This device is said to collect data continuously every 1 minute in real time and send it to the processing server every 5 minutes, which means the server room in 106 H6 will receive this data every 5 minutes. Due to that fact, this type of device must be able to be connected from the server room.
⮚	Analyze the fourth requirement: “Description of data: A sensor will measure a different index but their data format size is 32 KiB. Sensors will collect data one-minute once and after 5 minutes they send this data to the central server over the WIFI network. The operation system of 24/7 surveillance cameras 1 will store the data directly to a central server with a data transfer rate of 100 Mbps. The computers in the classrooms will download about 200MB per day (peak hours are 7:00 to 17:30). Each device when connected to the WIFI network is used with 256 Kbps maximum speed in terms of time 7h30 to 17h30.”
✔	The fourth requirement gives us trivial information about the data format size of the sensor and from there, our team knows that we will need to make the sensor connect to the wireless connection. For the camera, it must be a wire connection to the network due to the fact its data transfer rate is really large and it will transmit the data to a server in room 106 H6, which will have a data transfer rate of 100 Mbps to receive the record from camera as soon as possible in real time. Next, the computers in the computer room will download about 200MB per day in peak hours (time mentioned above). Finally, any electrical devices that can connect to the internet such as smartphones, tablets, ...  will only have the maximum speed at 256 Kbps when connecting to the wireless connection which is the same for sensors.
⮚	Analyze the fifth requirement: “the building H6 has an administrative office with 10 computers. The computers download about 200MB per day (peak hours are 8:00 am to 11:40 pm, 13h to 16h30) and send 10 emails per day with a maximum capacity of 10 MB per email.”
✔	The fifth requirement gives us details about an administrative office with 10 computers. These computers will only download about 200MB per day like a normal computer room but in addition, they will also send about 10 emails per day and it is also the maximum capacity for sending emails. 
⮚	Analyze the sixth requirement: “Each floor is the VLAN configuration and the system can connect to H6.”
✔	With this requirement, our team will need to create a VLAN for each floor in order to create a group of devices. Now, let's move to the detailed description that was added from the tutor.
3. The Detailed Description 
-	The cameras only transmit data to the server room and their record can only be accessed by admin in the administrative office or users in the server room. Therefore, our team network design must have separate VLAN between normal computers, devices with cameras and admin device, server room.
-	In floor 6,7 will have 6 computer rooms, each room will have 32 computers.
-	The camera will be implemented in the corridor of each floor.
-	The Administrative office will have 10 computers.
-	Height of each room is 3m.
-	Maximum port when connecting to the switch is 1 GB.
-	Floor 2 to 5 will have only a normal room with 6 small rooms (Height: 3m, Width: 10m, Depth: 5m), 3 large rooms (Height: 3m, Width: 20m, Depth: 5m). Floor 1 besides two types of rooms above will have 1 server room (Height: 3m, Width: 10m, Depth: 5m).
-	Floor 6 and 7 will have 4 small room (Height: 3m, Width: 10m, Depth: 5m), 2 large room (Height: 3m, Width: 20m, Depth: 5m), 3 computer room (Height: 3m, Width: 20m, Depth: 5m).
-	Each room will have an access point for devices to connect to the WIFI network through wireless connection.
-	Each floor will have a switch for the camera and access point from each room to connect.
-	Each switch from each floor then will connect to the main switch in floor 1.
-	The main switch then will connect to the final router before going out to the network.
-	Each camera will have a data transfer rate at 1 Mbps.
-	Each computer in the server room will have data transfer rate at 10 Mbps (to prevent the bandwidth to balance the network even though those computers connect to the same switch at the server and may have data transfer rate at 100 Mbps).

