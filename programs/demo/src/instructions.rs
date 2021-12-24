// Automatically generated rust module for 'instructions.proto' file

#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(unused_imports)]
#![allow(unknown_lints)]
#![allow(clippy::all)]
#![cfg_attr(rustfmt, rustfmt_skip)]


use std::borrow::Cow;
use quick_protobuf::{MessageRead, MessageWrite, BytesReader, Writer, WriterBackend, Result};
use quick_protobuf::sizeofs::*;
use super::*;

#[derive(Debug, Default, PartialEq, Clone)]
pub struct DemoInstructionData<'a> {
    pub kind: mod_DemoInstructionData::OneOfkind<'a>,
}

impl<'a> MessageRead<'a> for DemoInstructionData<'a> {
    fn from_reader(r: &mut BytesReader, bytes: &'a [u8]) -> Result<Self> {
        let mut msg = Self::default();
        while !r.is_eof() {
            match r.next_tag(bytes) {
                Ok(10) => msg.kind = mod_DemoInstructionData::OneOfkind::echo(r.read_message::<EchoInstruction>(bytes)?),
                Ok(18) => msg.kind = mod_DemoInstructionData::OneOfkind::add(r.read_message::<AddInstruction>(bytes)?),
                Ok(26) => msg.kind = mod_DemoInstructionData::OneOfkind::transfer(r.read_message::<TransferInstruction>(bytes)?),
                Ok(34) => msg.kind = mod_DemoInstructionData::OneOfkind::donate(r.read_message::<DonateInstruction>(bytes)?),
                Ok(t) => { r.read_unknown(bytes, t)?; }
                Err(e) => return Err(e),
            }
        }
        Ok(msg)
    }
}

impl<'a> MessageWrite for DemoInstructionData<'a> {
    fn get_size(&self) -> usize {
        0
        + match self.kind {
            mod_DemoInstructionData::OneOfkind::echo(ref m) => 1 + sizeof_len((m).get_size()),
            mod_DemoInstructionData::OneOfkind::add(ref m) => 1 + sizeof_len((m).get_size()),
            mod_DemoInstructionData::OneOfkind::transfer(ref m) => 1 + sizeof_len((m).get_size()),
            mod_DemoInstructionData::OneOfkind::donate(ref m) => 1 + sizeof_len((m).get_size()),
            mod_DemoInstructionData::OneOfkind::None => 0,
    }    }

    fn write_message<W: WriterBackend>(&self, w: &mut Writer<W>) -> Result<()> {
        match self.kind {            mod_DemoInstructionData::OneOfkind::echo(ref m) => { w.write_with_tag(10, |w| w.write_message(m))? },
            mod_DemoInstructionData::OneOfkind::add(ref m) => { w.write_with_tag(18, |w| w.write_message(m))? },
            mod_DemoInstructionData::OneOfkind::transfer(ref m) => { w.write_with_tag(26, |w| w.write_message(m))? },
            mod_DemoInstructionData::OneOfkind::donate(ref m) => { w.write_with_tag(34, |w| w.write_message(m))? },
            mod_DemoInstructionData::OneOfkind::None => {},
    }        Ok(())
    }
}

pub mod mod_DemoInstructionData {

use super::*;

#[derive(Debug, PartialEq, Clone)]
pub enum OneOfkind<'a> {
    echo(EchoInstruction<'a>),
    add(AddInstruction),
    transfer(TransferInstruction<'a>),
    donate(DonateInstruction),
    None,
}

impl<'a> Default for OneOfkind<'a> {
    fn default() -> Self {
        OneOfkind::None
    }
}

}

#[derive(Debug, Default, PartialEq, Clone)]
pub struct EchoInstruction<'a> {
    pub str_pb: Cow<'a, str>,
}

impl<'a> MessageRead<'a> for EchoInstruction<'a> {
    fn from_reader(r: &mut BytesReader, bytes: &'a [u8]) -> Result<Self> {
        let mut msg = Self::default();
        while !r.is_eof() {
            match r.next_tag(bytes) {
                Ok(10) => msg.str_pb = r.read_string(bytes).map(Cow::Borrowed)?,
                Ok(t) => { r.read_unknown(bytes, t)?; }
                Err(e) => return Err(e),
            }
        }
        Ok(msg)
    }
}

impl<'a> MessageWrite for EchoInstruction<'a> {
    fn get_size(&self) -> usize {
        0
        + if self.str_pb == "" { 0 } else { 1 + sizeof_len((&self.str_pb).len()) }
    }

    fn write_message<W: WriterBackend>(&self, w: &mut Writer<W>) -> Result<()> {
        if self.str_pb != "" { w.write_with_tag(10, |w| w.write_string(&**&self.str_pb))?; }
        Ok(())
    }
}

#[derive(Debug, Default, PartialEq, Clone)]
pub struct AddInstruction {
    pub a: i32,
    pub b: i32,
}

impl<'a> MessageRead<'a> for AddInstruction {
    fn from_reader(r: &mut BytesReader, bytes: &'a [u8]) -> Result<Self> {
        let mut msg = Self::default();
        while !r.is_eof() {
            match r.next_tag(bytes) {
                Ok(8) => msg.a = r.read_int32(bytes)?,
                Ok(16) => msg.b = r.read_int32(bytes)?,
                Ok(t) => { r.read_unknown(bytes, t)?; }
                Err(e) => return Err(e),
            }
        }
        Ok(msg)
    }
}

impl MessageWrite for AddInstruction {
    fn get_size(&self) -> usize {
        0
        + if self.a == 0i32 { 0 } else { 1 + sizeof_varint(*(&self.a) as u64) }
        + if self.b == 0i32 { 0 } else { 1 + sizeof_varint(*(&self.b) as u64) }
    }

    fn write_message<W: WriterBackend>(&self, w: &mut Writer<W>) -> Result<()> {
        if self.a != 0i32 { w.write_with_tag(8, |w| w.write_int32(*&self.a))?; }
        if self.b != 0i32 { w.write_with_tag(16, |w| w.write_int32(*&self.b))?; }
        Ok(())
    }
}

#[derive(Debug, Default, PartialEq, Clone)]
pub struct TransferInstruction<'a> {
    pub from: Cow<'a, str>,
    pub to: Cow<'a, str>,
}

impl<'a> MessageRead<'a> for TransferInstruction<'a> {
    fn from_reader(r: &mut BytesReader, bytes: &'a [u8]) -> Result<Self> {
        let mut msg = Self::default();
        while !r.is_eof() {
            match r.next_tag(bytes) {
                Ok(10) => msg.from = r.read_string(bytes).map(Cow::Borrowed)?,
                Ok(18) => msg.to = r.read_string(bytes).map(Cow::Borrowed)?,
                Ok(t) => { r.read_unknown(bytes, t)?; }
                Err(e) => return Err(e),
            }
        }
        Ok(msg)
    }
}

impl<'a> MessageWrite for TransferInstruction<'a> {
    fn get_size(&self) -> usize {
        0
        + if self.from == "" { 0 } else { 1 + sizeof_len((&self.from).len()) }
        + if self.to == "" { 0 } else { 1 + sizeof_len((&self.to).len()) }
    }

    fn write_message<W: WriterBackend>(&self, w: &mut Writer<W>) -> Result<()> {
        if self.from != "" { w.write_with_tag(10, |w| w.write_string(&**&self.from))?; }
        if self.to != "" { w.write_with_tag(18, |w| w.write_string(&**&self.to))?; }
        Ok(())
    }
}

#[derive(Debug, Default, PartialEq, Clone)]
pub struct DonateInstruction {
    pub amount: i64,
}

impl<'a> MessageRead<'a> for DonateInstruction {
    fn from_reader(r: &mut BytesReader, bytes: &'a [u8]) -> Result<Self> {
        let mut msg = Self::default();
        while !r.is_eof() {
            match r.next_tag(bytes) {
                Ok(8) => msg.amount = r.read_int64(bytes)?,
                Ok(t) => { r.read_unknown(bytes, t)?; }
                Err(e) => return Err(e),
            }
        }
        Ok(msg)
    }
}

impl MessageWrite for DonateInstruction {
    fn get_size(&self) -> usize {
        0
        + if self.amount == 0i64 { 0 } else { 1 + sizeof_varint(*(&self.amount) as u64) }
    }

    fn write_message<W: WriterBackend>(&self, w: &mut Writer<W>) -> Result<()> {
        if self.amount != 0i64 { w.write_with_tag(8, |w| w.write_int64(*&self.amount))?; }
        Ok(())
    }
}

